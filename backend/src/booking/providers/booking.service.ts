import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingStatus } from '../enums/booking-status.enums';

/** Service to manage bookings */
@Injectable()
export class BookingService {
    /** Dependency injection of PrismaService */
    constructor(private prisma: PrismaService) {}

    /** Create a new booking for the authenticated user */
    async createBooking(
        uid: string,
        createBookingDto: CreateBookingDto
    ) {
        const booking = await this.prisma.booking.create({
            data: { 
                bookedAt: createBookingDto.bookedAt,
                status: createBookingDto.status,
                trip: {
                    connect: { id: createBookingDto.tripId }
                },
                user: {
                    connect: { firebaseUid: uid }
                }
            },
        });
        return booking;
    }

    /** Change the status of an existing booking for the authenticated user */
    async changeBookingStatus(
        uid: string,
        bookingId: number,
        status: BookingStatus
    ) {
        const booking = await this.prisma.booking.findFirst({
            where: {
                id: bookingId,
                user: { firebaseUid: uid },
            },
        });

        if (!booking) {
            throw new NotFoundException(
                `Booking with id ${bookingId} not found for this user.`,
            );
        }

        /** Update the booking */
        const updatedBooking = await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status },
        });
        return updatedBooking;
    }
}
