import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingStatus } from '../enums/booking-status.enums';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) {}

    async createBooking(
        uid: string,
        createBookingDto: CreateBookingDto
    ) {
        const booking = await this.prisma.booking.create({
            data: { 
                ...createBookingDto,
                user: {
                    connect: { firebaseUid: uid }
                }
            },
        });
        return booking;
    }

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

        const updatedBooking = await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status },
        });
        return updatedBooking;
    }
}
