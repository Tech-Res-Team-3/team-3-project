import "../styles/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { View } from "react-native";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAuthStore } from "../stores/authStore";
import GlobalLoading from "../components/GlobalLoading";
import { useLoadingStore } from "../stores/loadingStore";
import { useProfileCompleteStore } from "../stores/profileCompleteStore";
import { useUserSync } from "../hooks/auth"; // Import your hook

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const segments = useSegments();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [firebaseUser, setFirebaseUser] =
    useState<FirebaseAuthTypes.User | null>(null);
  const [userSynced, setUserSynced] = useState(false); // Track if user has been synced
  const [initializing, setInitializing] = useState(true); // Flag to prevent loading conflicts
  const syncingRef = useRef(false); // Track if we're currently syncing
  const logoutRef = useRef(false); // Track if logout is in progress
  
  // Optimized Zustand selectors to prevent unnecessary re-renders
  const user = useAuthStore(useCallback((state) => state.user, []));
  const profileComplete = useProfileCompleteStore(
    useCallback((state) => state.profileComplete, [])
  );
  
  const { syncUser } = useUserSync();

  useEffect(() => {
    const app = getApp();
    const auth = getAuth(app);
    
    let timeoutId: NodeJS.Timeout;
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      clearTimeout(timeoutId);
      
      // Debounce auth state changes to prevent rapid updates and useInsertionEffect warnings
      timeoutId = setTimeout(() => {
        console.log("Auth state changed:", firebaseUser ? "User logged in" : "User logged out");
        
        // Use requestAnimationFrame to defer state updates outside render phase
        requestAnimationFrame(() => {
          setFirebaseUser(firebaseUser);
          console.log("Setting checkingAuth: false");
          setCheckingAuth(false);
          setInitializing(false); // Mark initialization as complete

          if (firebaseUser) {
            // User is authenticated - reset sync state for fresh login
            if (!userSynced && !syncingRef.current) {
              console.log("Starting user sync for authenticated user");
              syncingRef.current = true;
              // Also reset userSynced to ensure clean state
              setUserSynced(false);
              
              syncUser()
                .then(() => {
                  console.log("User synced successfully, setting userSynced to true");
                  // Use requestAnimationFrame to avoid render phase updates
                  requestAnimationFrame(() => {
                    setUserSynced(true);
                    syncingRef.current = false;
                  });
                })
                .catch((err) => {
                  console.log("User sync error:", err);
                  // Reset sync flags on error but don't block navigation
                  requestAnimationFrame(() => {
                    setUserSynced(true); // Set to true anyway to allow navigation
                    syncingRef.current = false;
                  });
                });
            } else if (userSynced) {
              console.log("User already synced");
            } else if (syncingRef.current) {
              console.log("User sync already in progress");
            }
          } else {
            // User is not authenticated - handle logout
            if (!logoutRef.current) {
              logoutRef.current = true;
              console.log("User logged out, clearing Zustand user");
              useAuthStore.getState().clearUser();
              setUserSynced(false); // Reset sync flag
              syncingRef.current = false; // Reset syncing flag
              
              // Reset logout flag after a delay
              setTimeout(() => {
                logoutRef.current = false;
              }, 1000);
            }
          }
        });
      }, 50); // 50ms debounce - faster for logout responsiveness
    });

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [router]); // Removed syncUser and segments to prevent infinite re-runs

  // Separate effect to handle navigation based on auth state changes
  useEffect(() => {
    // Only navigate if auth is not being checked and we're not initializing
    if (!checkingAuth && !initializing && firebaseUser) {
      console.log("Navigation effect triggered. UserSynced:", userSynced, "Pathname:", pathname);
      
      if (userSynced) {
        // Authenticated user with synced data - handle navigation
        const currentRoute = segments[0];
        console.log("Navigation effect - Current route segments:", segments, "pathname:", pathname);
        
        // If on login/signup pages, always redirect to app
        if (pathname === "/login" || pathname === "/signup") {
          console.log(`Redirecting from ${pathname} to /(app) after successful login`);
          router.replace("/(app)");
        } else if (currentRoute && currentRoute !== "(app)") {
          console.log(`Redirecting authenticated user from ${currentRoute} to /(app)`);
          router.replace("/(app)");
        } else if (!currentRoute) {
          // If no segments, we're at root - redirect to app
          console.log("Redirecting authenticated user from root to /(app)");
          router.replace("/(app)");
        } else {
          console.log("User already on correct route, no redirect needed");
        }
      } else if (!syncingRef.current) {
        // User is authenticated but not synced and not currently syncing
        console.log("Authenticated user not synced, waiting for sync to complete");
        
        // Add a timeout to prevent infinite waiting
        const timeoutId = setTimeout(() => {
          console.log("Sync timeout reached, forcing navigation anyway");
          setUserSynced(true); // Force sync to true to allow navigation
        }, 2000); // 2 second timeout
        
        return () => clearTimeout(timeoutId);
      }
    }
    
    // Handle logout navigation for unauthenticated users
    if (!checkingAuth && !initializing && !firebaseUser && !logoutRef.current) {
      const currentRoute = segments[0];
      console.log("Logout navigation - current route segments:", segments, "pathname:", pathname);
      
      // Always redirect to home on logout to ensure clean state
      if (currentRoute === "(app)" || pathname.startsWith("/(app)")) {
        console.log("Redirecting unauthenticated user to home after logout");
        router.replace("/home");
        console.log("Navigation to /home completed with replace");
      }
    }
  }, [firebaseUser, userSynced, checkingAuth, initializing, pathname, segments, router]);

  useEffect(() => {
    if (!profileComplete && pathname !== "/complete-profile") {
      router.replace("/complete-profile");
    }
  }, [profileComplete, pathname, router]);

  // Route protection effect - with debouncing to prevent rapid changes
  useEffect(() => {
    // Add debouncing to prevent rapid navigation changes
    const timeoutId = setTimeout(() => {
      // Don't interfere if we're still checking auth or syncing user
      if (!checkingAuth && !syncingRef.current) {
        // Define public routes (unauthenticated)
        const publicRoutes = ["/", "/home", "/login", "/signup"];
        // Define protected routes (authenticated)
        const protectedRoutes = ["/(app)", "/dashboard"];
        
        if (firebaseUser && userSynced) {
          // Authenticated user is on protected routes -> allow (do nothing)
          // Auth state change handler already handles redirecting from public routes
          console.log("Authenticated user with synced data - no redirect needed from route protection");
        } else if (firebaseUser && !userSynced) {
          // Authenticated user but not synced yet -> allow (waiting for sync)
          console.log("Authenticated user waiting for sync");
        } else if (!firebaseUser) {
          // Unauthenticated user accessing protected routes -> redirect to home
          if (protectedRoutes.some(route => pathname.startsWith(route)) || segments.includes("(app)")) {
            console.log(`Unauthenticated user on protected route (${pathname}, segments: ${segments}), redirecting to /home`);
            setTimeout(() => {
              router.replace("/home");
            }, 0);
          }
          // Unauthenticated user on public routes -> allow (do nothing)
          else if (publicRoutes.includes(pathname)) {
            console.log(`Unauthenticated user on valid public route: ${pathname}`);
            // Don't set loading state here - let the auth effect handle it
          }
        }
        // If user is authenticated but not synced yet, don't interfere
      }
    }, 150); // 150ms debounce

    return () => clearTimeout(timeoutId);
  }, [pathname, firebaseUser, checkingAuth, router, userSynced]);

  useEffect(() => {
    // Show global loading when checking auth - but only on initial load
    if (checkingAuth && initializing) {
      console.log("Setting loading: true (initial auth check)");
      useLoadingStore.getState().setLoading(true);
      
      // Add a safety timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        console.log("Auth check timeout - clearing loading");
        useLoadingStore.getState().setLoading(false);
        setCheckingAuth(false);
        setInitializing(false);
      }, 5000); // Reduced from 10s to 5s
      
      return () => clearTimeout(timeout);
    } else if (!checkingAuth) {
      setInitializing(false);
      
      // Only clear loading if we're not in the middle of a navigation
      const currentRoute = segments[0];
      console.log("Auth checking done, current route:", currentRoute);
      
      // Don't interfere with loading if user is navigating to public routes
      if (!firebaseUser && (pathname === "/login" || pathname === "/signup" || pathname === "/" || pathname === "/home")) {
        console.log("User on public route, clearing loading");
        useLoadingStore.getState().setLoading(false);
      } else if (firebaseUser && (currentRoute === "(app)" || pathname.startsWith("/(app)"))) {
        console.log("Authenticated user on protected route, clearing loading");
        useLoadingStore.getState().setLoading(false);
      }
    }
  }, [checkingAuth, firebaseUser, pathname, segments, initializing]);

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        <GlobalLoading />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ animation: "fade" }} />
          <Stack.Screen name="home" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(app)" />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}
