'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AddressesModule.html" data-type="entity-link" >AddressesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AddressesModule-77f73716016b048e059fb134b21b206bb40fcbe1bb965c51443408118d90e2fa2ff9cbd06b189193fea07896e47b73e2a2e6e49f7e0262d20379679ad9acef66"' : 'data-bs-target="#xs-controllers-links-module-AddressesModule-77f73716016b048e059fb134b21b206bb40fcbe1bb965c51443408118d90e2fa2ff9cbd06b189193fea07896e47b73e2a2e6e49f7e0262d20379679ad9acef66"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AddressesModule-77f73716016b048e059fb134b21b206bb40fcbe1bb965c51443408118d90e2fa2ff9cbd06b189193fea07896e47b73e2a2e6e49f7e0262d20379679ad9acef66"' :
                                            'id="xs-controllers-links-module-AddressesModule-77f73716016b048e059fb134b21b206bb40fcbe1bb965c51443408118d90e2fa2ff9cbd06b189193fea07896e47b73e2a2e6e49f7e0262d20379679ad9acef66"' }>
                                            <li class="link">
                                                <a href="controllers/AddressesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AddressesModule-77f73716016b048e059fb134b21b206bb40fcbe1bb965c51443408118d90e2fa2ff9cbd06b189193fea07896e47b73e2a2e6e49f7e0262d20379679ad9acef66"' : 'data-bs-target="#xs-injectables-links-module-AddressesModule-77f73716016b048e059fb134b21b206bb40fcbe1bb965c51443408118d90e2fa2ff9cbd06b189193fea07896e47b73e2a2e6e49f7e0262d20379679ad9acef66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AddressesModule-77f73716016b048e059fb134b21b206bb40fcbe1bb965c51443408118d90e2fa2ff9cbd06b189193fea07896e47b73e2a2e6e49f7e0262d20379679ad9acef66"' :
                                        'id="xs-injectables-links-module-AddressesModule-77f73716016b048e059fb134b21b206bb40fcbe1bb965c51443408118d90e2fa2ff9cbd06b189193fea07896e47b73e2a2e6e49f7e0262d20379679ad9acef66"' }>
                                        <li class="link">
                                            <a href="injectables/AddressesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FirebaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FirebaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminsModule.html" data-type="entity-link" >AdminsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminsModule-d91ac5dec960bcf9438ba34b347fd1218d5aed3abbdff7dc6c0588afa7ae3aa33a6fb5efc86573a5b8db1462e3620114c4347dfce722d63ea76054b9264df64a"' : 'data-bs-target="#xs-controllers-links-module-AdminsModule-d91ac5dec960bcf9438ba34b347fd1218d5aed3abbdff7dc6c0588afa7ae3aa33a6fb5efc86573a5b8db1462e3620114c4347dfce722d63ea76054b9264df64a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminsModule-d91ac5dec960bcf9438ba34b347fd1218d5aed3abbdff7dc6c0588afa7ae3aa33a6fb5efc86573a5b8db1462e3620114c4347dfce722d63ea76054b9264df64a"' :
                                            'id="xs-controllers-links-module-AdminsModule-d91ac5dec960bcf9438ba34b347fd1218d5aed3abbdff7dc6c0588afa7ae3aa33a6fb5efc86573a5b8db1462e3620114c4347dfce722d63ea76054b9264df64a"' }>
                                            <li class="link">
                                                <a href="controllers/AdminsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminsModule-d91ac5dec960bcf9438ba34b347fd1218d5aed3abbdff7dc6c0588afa7ae3aa33a6fb5efc86573a5b8db1462e3620114c4347dfce722d63ea76054b9264df64a"' : 'data-bs-target="#xs-injectables-links-module-AdminsModule-d91ac5dec960bcf9438ba34b347fd1218d5aed3abbdff7dc6c0588afa7ae3aa33a6fb5efc86573a5b8db1462e3620114c4347dfce722d63ea76054b9264df64a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminsModule-d91ac5dec960bcf9438ba34b347fd1218d5aed3abbdff7dc6c0588afa7ae3aa33a6fb5efc86573a5b8db1462e3620114c4347dfce722d63ea76054b9264df64a"' :
                                        'id="xs-injectables-links-module-AdminsModule-d91ac5dec960bcf9438ba34b347fd1218d5aed3abbdff7dc6c0588afa7ae3aa33a6fb5efc86573a5b8db1462e3620114c4347dfce722d63ea76054b9264df64a"' }>
                                        <li class="link">
                                            <a href="injectables/AdminsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-960b73b0e3cafafde4a195e70bc07f22eba28b9225ea1c668d6698f2c35fe34d25b112f5b539f60e28c947e88655b6c4b6a6d2841e35a6c300b697d80c3cf139"' : 'data-bs-target="#xs-controllers-links-module-AppModule-960b73b0e3cafafde4a195e70bc07f22eba28b9225ea1c668d6698f2c35fe34d25b112f5b539f60e28c947e88655b6c4b6a6d2841e35a6c300b697d80c3cf139"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-960b73b0e3cafafde4a195e70bc07f22eba28b9225ea1c668d6698f2c35fe34d25b112f5b539f60e28c947e88655b6c4b6a6d2841e35a6c300b697d80c3cf139"' :
                                            'id="xs-controllers-links-module-AppModule-960b73b0e3cafafde4a195e70bc07f22eba28b9225ea1c668d6698f2c35fe34d25b112f5b539f60e28c947e88655b6c4b6a6d2841e35a6c300b697d80c3cf139"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-960b73b0e3cafafde4a195e70bc07f22eba28b9225ea1c668d6698f2c35fe34d25b112f5b539f60e28c947e88655b6c4b6a6d2841e35a6c300b697d80c3cf139"' : 'data-bs-target="#xs-injectables-links-module-AppModule-960b73b0e3cafafde4a195e70bc07f22eba28b9225ea1c668d6698f2c35fe34d25b112f5b539f60e28c947e88655b6c4b6a6d2841e35a6c300b697d80c3cf139"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-960b73b0e3cafafde4a195e70bc07f22eba28b9225ea1c668d6698f2c35fe34d25b112f5b539f60e28c947e88655b6c4b6a6d2841e35a6c300b697d80c3cf139"' :
                                        'id="xs-injectables-links-module-AppModule-960b73b0e3cafafde4a195e70bc07f22eba28b9225ea1c668d6698f2c35fe34d25b112f5b539f60e28c947e88655b6c4b6a6d2841e35a6c300b697d80c3cf139"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookingModule.html" data-type="entity-link" >BookingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BookingModule-9f2de31cc32582cb12dd429e825dba0499647b96bf567861dc0dfa251b9a7b37cc95f5e0c7d4ffc9bb80f02ca375539a82a46404f300ba54e5fa234849616260"' : 'data-bs-target="#xs-controllers-links-module-BookingModule-9f2de31cc32582cb12dd429e825dba0499647b96bf567861dc0dfa251b9a7b37cc95f5e0c7d4ffc9bb80f02ca375539a82a46404f300ba54e5fa234849616260"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BookingModule-9f2de31cc32582cb12dd429e825dba0499647b96bf567861dc0dfa251b9a7b37cc95f5e0c7d4ffc9bb80f02ca375539a82a46404f300ba54e5fa234849616260"' :
                                            'id="xs-controllers-links-module-BookingModule-9f2de31cc32582cb12dd429e825dba0499647b96bf567861dc0dfa251b9a7b37cc95f5e0c7d4ffc9bb80f02ca375539a82a46404f300ba54e5fa234849616260"' }>
                                            <li class="link">
                                                <a href="controllers/BookingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BookingModule-9f2de31cc32582cb12dd429e825dba0499647b96bf567861dc0dfa251b9a7b37cc95f5e0c7d4ffc9bb80f02ca375539a82a46404f300ba54e5fa234849616260"' : 'data-bs-target="#xs-injectables-links-module-BookingModule-9f2de31cc32582cb12dd429e825dba0499647b96bf567861dc0dfa251b9a7b37cc95f5e0c7d4ffc9bb80f02ca375539a82a46404f300ba54e5fa234849616260"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BookingModule-9f2de31cc32582cb12dd429e825dba0499647b96bf567861dc0dfa251b9a7b37cc95f5e0c7d4ffc9bb80f02ca375539a82a46404f300ba54e5fa234849616260"' :
                                        'id="xs-injectables-links-module-BookingModule-9f2de31cc32582cb12dd429e825dba0499647b96bf567861dc0dfa251b9a7b37cc95f5e0c7d4ffc9bb80f02ca375539a82a46404f300ba54e5fa234849616260"' }>
                                        <li class="link">
                                            <a href="injectables/BookingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FirebaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FirebaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DriversLicensesModule.html" data-type="entity-link" >DriversLicensesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DriversLicensesModule-78dc0449c2e1d5c6f629f8753bcb1e09e222aad57b09c523f9899463637247f55d046bdf5a7c1794788fff9dd836acf1252ba8dc04d535e799a6a55abaeee8a6"' : 'data-bs-target="#xs-controllers-links-module-DriversLicensesModule-78dc0449c2e1d5c6f629f8753bcb1e09e222aad57b09c523f9899463637247f55d046bdf5a7c1794788fff9dd836acf1252ba8dc04d535e799a6a55abaeee8a6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DriversLicensesModule-78dc0449c2e1d5c6f629f8753bcb1e09e222aad57b09c523f9899463637247f55d046bdf5a7c1794788fff9dd836acf1252ba8dc04d535e799a6a55abaeee8a6"' :
                                            'id="xs-controllers-links-module-DriversLicensesModule-78dc0449c2e1d5c6f629f8753bcb1e09e222aad57b09c523f9899463637247f55d046bdf5a7c1794788fff9dd836acf1252ba8dc04d535e799a6a55abaeee8a6"' }>
                                            <li class="link">
                                                <a href="controllers/DriversLicensesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DriversLicensesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DriversLicensesModule-78dc0449c2e1d5c6f629f8753bcb1e09e222aad57b09c523f9899463637247f55d046bdf5a7c1794788fff9dd836acf1252ba8dc04d535e799a6a55abaeee8a6"' : 'data-bs-target="#xs-injectables-links-module-DriversLicensesModule-78dc0449c2e1d5c6f629f8753bcb1e09e222aad57b09c523f9899463637247f55d046bdf5a7c1794788fff9dd836acf1252ba8dc04d535e799a6a55abaeee8a6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DriversLicensesModule-78dc0449c2e1d5c6f629f8753bcb1e09e222aad57b09c523f9899463637247f55d046bdf5a7c1794788fff9dd836acf1252ba8dc04d535e799a6a55abaeee8a6"' :
                                        'id="xs-injectables-links-module-DriversLicensesModule-78dc0449c2e1d5c6f629f8753bcb1e09e222aad57b09c523f9899463637247f55d046bdf5a7c1794788fff9dd836acf1252ba8dc04d535e799a6a55abaeee8a6"' }>
                                        <li class="link">
                                            <a href="injectables/DriversLicensesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DriversLicensesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FirebaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FirebaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileStorageModule.html" data-type="entity-link" >FileStorageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FileStorageModule-8ea9aa08da19aebbc72dbbeaf9297d7931b36b57def160ab60116e1e4fbec900b5ff9ee21b660bac076f23139dae221aad25e3c177ec974c4ef74286c0250e58"' : 'data-bs-target="#xs-controllers-links-module-FileStorageModule-8ea9aa08da19aebbc72dbbeaf9297d7931b36b57def160ab60116e1e4fbec900b5ff9ee21b660bac076f23139dae221aad25e3c177ec974c4ef74286c0250e58"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FileStorageModule-8ea9aa08da19aebbc72dbbeaf9297d7931b36b57def160ab60116e1e4fbec900b5ff9ee21b660bac076f23139dae221aad25e3c177ec974c4ef74286c0250e58"' :
                                            'id="xs-controllers-links-module-FileStorageModule-8ea9aa08da19aebbc72dbbeaf9297d7931b36b57def160ab60116e1e4fbec900b5ff9ee21b660bac076f23139dae221aad25e3c177ec974c4ef74286c0250e58"' }>
                                            <li class="link">
                                                <a href="controllers/FileStorageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileStorageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FileStorageModule-8ea9aa08da19aebbc72dbbeaf9297d7931b36b57def160ab60116e1e4fbec900b5ff9ee21b660bac076f23139dae221aad25e3c177ec974c4ef74286c0250e58"' : 'data-bs-target="#xs-injectables-links-module-FileStorageModule-8ea9aa08da19aebbc72dbbeaf9297d7931b36b57def160ab60116e1e4fbec900b5ff9ee21b660bac076f23139dae221aad25e3c177ec974c4ef74286c0250e58"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileStorageModule-8ea9aa08da19aebbc72dbbeaf9297d7931b36b57def160ab60116e1e4fbec900b5ff9ee21b660bac076f23139dae221aad25e3c177ec974c4ef74286c0250e58"' :
                                        'id="xs-injectables-links-module-FileStorageModule-8ea9aa08da19aebbc72dbbeaf9297d7931b36b57def160ab60116e1e4fbec900b5ff9ee21b660bac076f23139dae221aad25e3c177ec974c4ef74286c0250e58"' }>
                                        <li class="link">
                                            <a href="injectables/FileStorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileStorageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FirebaseModule.html" data-type="entity-link" >FirebaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FirebaseModule-f031bb3639e5333e796a265ae371da4560877b0e371d7afca936ff43fb3e267e1479abb3ad158bf22799d583e628d10bee2c04bec13fc95916fa6f7285728de3"' : 'data-bs-target="#xs-injectables-links-module-FirebaseModule-f031bb3639e5333e796a265ae371da4560877b0e371d7afca936ff43fb3e267e1479abb3ad158bf22799d583e628d10bee2c04bec13fc95916fa6f7285728de3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FirebaseModule-f031bb3639e5333e796a265ae371da4560877b0e371d7afca936ff43fb3e267e1479abb3ad158bf22799d583e628d10bee2c04bec13fc95916fa6f7285728de3"' :
                                        'id="xs-injectables-links-module-FirebaseModule-f031bb3639e5333e796a265ae371da4560877b0e371d7afca936ff43fb3e267e1479abb3ad158bf22799d583e628d10bee2c04bec13fc95916fa6f7285728de3"' }>
                                        <li class="link">
                                            <a href="injectables/FirebaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FirebaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-6c41a88b7e2d2caff5b662d80dd5add39f8d68d5483bf78d29748ecd055efb0b6558dd5bde1f69404534d103abbb3cf76671dc203e4b795014a87913279f5860"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-6c41a88b7e2d2caff5b662d80dd5add39f8d68d5483bf78d29748ecd055efb0b6558dd5bde1f69404534d103abbb3cf76671dc203e4b795014a87913279f5860"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-6c41a88b7e2d2caff5b662d80dd5add39f8d68d5483bf78d29748ecd055efb0b6558dd5bde1f69404534d103abbb3cf76671dc203e4b795014a87913279f5860"' :
                                        'id="xs-injectables-links-module-PrismaModule-6c41a88b7e2d2caff5b662d80dd5add39f8d68d5483bf78d29748ecd055efb0b6558dd5bde1f69404534d103abbb3cf76671dc203e4b795014a87913279f5860"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TripsModule.html" data-type="entity-link" >TripsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TripsModule-ced4d74eb961da0c7bb18037bc370adac3e5e899d297725aa051813b667897fc8cf1ca5402a19e977c5db6b4eff32fdb1784466e7a82ed49d154c44c1eed6696"' : 'data-bs-target="#xs-controllers-links-module-TripsModule-ced4d74eb961da0c7bb18037bc370adac3e5e899d297725aa051813b667897fc8cf1ca5402a19e977c5db6b4eff32fdb1784466e7a82ed49d154c44c1eed6696"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TripsModule-ced4d74eb961da0c7bb18037bc370adac3e5e899d297725aa051813b667897fc8cf1ca5402a19e977c5db6b4eff32fdb1784466e7a82ed49d154c44c1eed6696"' :
                                            'id="xs-controllers-links-module-TripsModule-ced4d74eb961da0c7bb18037bc370adac3e5e899d297725aa051813b667897fc8cf1ca5402a19e977c5db6b4eff32fdb1784466e7a82ed49d154c44c1eed6696"' }>
                                            <li class="link">
                                                <a href="controllers/TripsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TripsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TripsModule-ced4d74eb961da0c7bb18037bc370adac3e5e899d297725aa051813b667897fc8cf1ca5402a19e977c5db6b4eff32fdb1784466e7a82ed49d154c44c1eed6696"' : 'data-bs-target="#xs-injectables-links-module-TripsModule-ced4d74eb961da0c7bb18037bc370adac3e5e899d297725aa051813b667897fc8cf1ca5402a19e977c5db6b4eff32fdb1784466e7a82ed49d154c44c1eed6696"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TripsModule-ced4d74eb961da0c7bb18037bc370adac3e5e899d297725aa051813b667897fc8cf1ca5402a19e977c5db6b4eff32fdb1784466e7a82ed49d154c44c1eed6696"' :
                                        'id="xs-injectables-links-module-TripsModule-ced4d74eb961da0c7bb18037bc370adac3e5e899d297725aa051813b667897fc8cf1ca5402a19e977c5db6b4eff32fdb1784466e7a82ed49d154c44c1eed6696"' }>
                                        <li class="link">
                                            <a href="injectables/BookingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FirebaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FirebaseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TripsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TripsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-f28ddffeb8bbc80a6a4834a12af6d4ec53a8a9ad6e898836b21b044737184e78936234e35ee3c7474bd40e2d111bf0bbed10730a44913437a97302fd04181076"' : 'data-bs-target="#xs-controllers-links-module-UserModule-f28ddffeb8bbc80a6a4834a12af6d4ec53a8a9ad6e898836b21b044737184e78936234e35ee3c7474bd40e2d111bf0bbed10730a44913437a97302fd04181076"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f28ddffeb8bbc80a6a4834a12af6d4ec53a8a9ad6e898836b21b044737184e78936234e35ee3c7474bd40e2d111bf0bbed10730a44913437a97302fd04181076"' :
                                            'id="xs-controllers-links-module-UserModule-f28ddffeb8bbc80a6a4834a12af6d4ec53a8a9ad6e898836b21b044737184e78936234e35ee3c7474bd40e2d111bf0bbed10730a44913437a97302fd04181076"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-f28ddffeb8bbc80a6a4834a12af6d4ec53a8a9ad6e898836b21b044737184e78936234e35ee3c7474bd40e2d111bf0bbed10730a44913437a97302fd04181076"' : 'data-bs-target="#xs-injectables-links-module-UserModule-f28ddffeb8bbc80a6a4834a12af6d4ec53a8a9ad6e898836b21b044737184e78936234e35ee3c7474bd40e2d111bf0bbed10730a44913437a97302fd04181076"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f28ddffeb8bbc80a6a4834a12af6d4ec53a8a9ad6e898836b21b044737184e78936234e35ee3c7474bd40e2d111bf0bbed10730a44913437a97302fd04181076"' :
                                        'id="xs-injectables-links-module-UserModule-f28ddffeb8bbc80a6a4834a12af6d4ec53a8a9ad6e898836b21b044737184e78936234e35ee3c7474bd40e2d111bf0bbed10730a44913437a97302fd04181076"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-351b04f89b10d1205ed7bd05c16bae00c689f62298479e63a0e0a298b0ac2be150ad10ca0c294d150942bbc401b6f2e7d7e043f25ed9865bf7c4a3520b91519a"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-351b04f89b10d1205ed7bd05c16bae00c689f62298479e63a0e0a298b0ac2be150ad10ca0c294d150942bbc401b6f2e7d7e043f25ed9865bf7c4a3520b91519a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-351b04f89b10d1205ed7bd05c16bae00c689f62298479e63a0e0a298b0ac2be150ad10ca0c294d150942bbc401b6f2e7d7e043f25ed9865bf7c4a3520b91519a"' :
                                            'id="xs-controllers-links-module-UsersModule-351b04f89b10d1205ed7bd05c16bae00c689f62298479e63a0e0a298b0ac2be150ad10ca0c294d150942bbc401b6f2e7d7e043f25ed9865bf7c4a3520b91519a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-351b04f89b10d1205ed7bd05c16bae00c689f62298479e63a0e0a298b0ac2be150ad10ca0c294d150942bbc401b6f2e7d7e043f25ed9865bf7c4a3520b91519a"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-351b04f89b10d1205ed7bd05c16bae00c689f62298479e63a0e0a298b0ac2be150ad10ca0c294d150942bbc401b6f2e7d7e043f25ed9865bf7c4a3520b91519a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-351b04f89b10d1205ed7bd05c16bae00c689f62298479e63a0e0a298b0ac2be150ad10ca0c294d150942bbc401b6f2e7d7e043f25ed9865bf7c4a3520b91519a"' :
                                        'id="xs-injectables-links-module-UsersModule-351b04f89b10d1205ed7bd05c16bae00c689f62298479e63a0e0a298b0ac2be150ad10ca0c294d150942bbc401b6f2e7d7e043f25ed9865bf7c4a3520b91519a"' }>
                                        <li class="link">
                                            <a href="injectables/FirebaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FirebaseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VehicleModule.html" data-type="entity-link" >VehicleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VehicleModule-1d4ee648c3a40d11af660cc86fbc553ad3211f60f847b89cbf81326f498e4881eb265b1258a2cd3138919cbd0624295e1868a06435729e3d8918385f338cdc86"' : 'data-bs-target="#xs-controllers-links-module-VehicleModule-1d4ee648c3a40d11af660cc86fbc553ad3211f60f847b89cbf81326f498e4881eb265b1258a2cd3138919cbd0624295e1868a06435729e3d8918385f338cdc86"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VehicleModule-1d4ee648c3a40d11af660cc86fbc553ad3211f60f847b89cbf81326f498e4881eb265b1258a2cd3138919cbd0624295e1868a06435729e3d8918385f338cdc86"' :
                                            'id="xs-controllers-links-module-VehicleModule-1d4ee648c3a40d11af660cc86fbc553ad3211f60f847b89cbf81326f498e4881eb265b1258a2cd3138919cbd0624295e1868a06435729e3d8918385f338cdc86"' }>
                                            <li class="link">
                                                <a href="controllers/VehicleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehicleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VehicleModule-1d4ee648c3a40d11af660cc86fbc553ad3211f60f847b89cbf81326f498e4881eb265b1258a2cd3138919cbd0624295e1868a06435729e3d8918385f338cdc86"' : 'data-bs-target="#xs-injectables-links-module-VehicleModule-1d4ee648c3a40d11af660cc86fbc553ad3211f60f847b89cbf81326f498e4881eb265b1258a2cd3138919cbd0624295e1868a06435729e3d8918385f338cdc86"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VehicleModule-1d4ee648c3a40d11af660cc86fbc553ad3211f60f847b89cbf81326f498e4881eb265b1258a2cd3138919cbd0624295e1868a06435729e3d8918385f338cdc86"' :
                                        'id="xs-injectables-links-module-VehicleModule-1d4ee648c3a40d11af660cc86fbc553ad3211f60f847b89cbf81326f498e4881eb265b1258a2cd3138919cbd0624295e1868a06435729e3d8918385f338cdc86"' }>
                                        <li class="link">
                                            <a href="injectables/VehicleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehicleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AddressesController.html" data-type="entity-link" >AddressesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AdminsController.html" data-type="entity-link" >AdminsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BookingController.html" data-type="entity-link" >BookingController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DriversLicensesController.html" data-type="entity-link" >DriversLicensesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FileStorageController.html" data-type="entity-link" >FileStorageController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TripsController.html" data-type="entity-link" >TripsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/VehicleController.html" data-type="entity-link" >VehicleController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateAddressDto.html" data-type="entity-link" >CreateAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookingDto.html" data-type="entity-link" >CreateBookingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDriversLicenseDto.html" data-type="entity-link" >CreateDriversLicenseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTripDto.html" data-type="entity-link" >CreateTripDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVehicleDto.html" data-type="entity-link" >CreateVehicleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteUsersDto.html" data-type="entity-link" >DeleteUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSignedUrlDto.html" data-type="entity-link" >GetSignedUrlDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveImageDto.html" data-type="entity-link" >SaveImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncUserDto.html" data-type="entity-link" >SyncUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAddressDto.html" data-type="entity-link" >UpdateAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAddressDto-1.html" data-type="entity-link" >UpdateAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBookingDto.html" data-type="entity-link" >UpdateBookingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDriversLicenseDto.html" data-type="entity-link" >UpdateDriversLicenseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTripDto.html" data-type="entity-link" >UpdateTripDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVehicleDto.html" data-type="entity-link" >UpdateVehicleDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddressesService.html" data-type="entity-link" >AddressesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminsService.html" data-type="entity-link" >AdminsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookingService.html" data-type="entity-link" >BookingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DriversLicensesService.html" data-type="entity-link" >DriversLicensesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileStorageService.html" data-type="entity-link" >FileStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseService.html" data-type="entity-link" >FirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TripsService.html" data-type="entity-link" >TripsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VehicleService.html" data-type="entity-link" >VehicleService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/FirebaseAuthGuard.html" data-type="entity-link" >FirebaseAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthenticatedUser.html" data-type="entity-link" >AuthenticatedUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseUser.html" data-type="entity-link" >FirebaseUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});