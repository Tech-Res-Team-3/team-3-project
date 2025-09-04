import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto } from '../dto';
import { isAscii } from 'buffer';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async createVehicle(firebaseUid: string, data: CreateVehicleDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { firebaseUid },
        include: { addresses: true },
      });

      if (!user) throw new Error('User not found');
      if (user.addresses.length === 0) throw new Error('User has no address');

      const userAddress = user.addresses[0];

      return await this.prisma.vehicle.create({
        data: {
          ...data,
          vehicleImage: data.vehicleImage || '',
          user: {
            connect: { firebaseUid },
          },
          addresses: {
            connect: { id: userAddress.id },
          },
        },
        include: { addresses: true },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateVehicle(id: number, data: UpdateVehicleDto) {
    const updatedVehicle = await this.prisma.vehicle.update({
      where: { id },
      data,
    });

    return updatedVehicle;
  }

  async getMyVehicles(firebaseUid: string) {
    const myVehicles = await this.prisma.vehicle.findMany({
      where: {
        user: { firebaseUid },
      },
    });

    return myVehicles;
  }

  async findVehiclesNearby(lat: number, lng: number, radius: number) {
    const results = await this.prisma.$queryRaw<
      {
        vehicle_id: number;
        make: string;
        model: string;
        year: number;
        licensePlate: string;
        color: string;
        seats: number;
        type: string;
        vehicleImage: string | null;
        verified: boolean;
        rating: number;
        hasSeatbelts: boolean;
        seatbeltType: string;
        condition: string;
        value: number;
        vin: string;
        mileage: number;
        transmission: string;
        salesTaxPaid: boolean;
        trim: string;
        bodyStyle: string;
        hasSalvageTitle: boolean;
        extraInfo: string;
        userId: number;

        // Address fields
        address_id: number;
        street: string;
        apartment: string | null;
        city: string;
        state: string;
        zip: number;
        country: string;
        latitude: number;
        longitude: number;
        distance: number;
      }[]
    >`
      SELECT DISTINCT ON v.*
      FROM "Vehicle" v
      JOIN "_VehicleAddresses" va ON va."A" = v."id"
      JOIN "Address" a ON a."id" = va."B"
      WHERE ST_DWithin(
        ST_MakePoint(a."longitude", a."latitude")::geography,
        ST_MakePoint(${lng}, ${lat})::geography,
        ${radius * 1000}
      ) AS distance
      FROM "Vehicle" v
      JOIN "_VehicleAddresses" va ON va."A" = v.id
      JOIN "Address" a ON a.id = va."B"
      WHERE ST_DWithin(
        ST_MakePoint(a.longitude, a.latitude)::geography,
        ST_MakePoint(${lng}, ${lat})::geography,
        ${radius * 1000}
      )
      ORDER BY distance ASC
    `;

    return results.map((r) => ({
      vehicle: {
        id: r.vehicle_id,
        make: r.make,
        model: r.model,
        year: r.year,
        licensePlate: r.licensePlate,
        color: r.color,
        seats: r.seats,
        type: r.type,
        vehicleImage: r.vehicleImage,
        verified: r.verified,
        rating: r.rating,
        hasSeatbelts: r.hasSeatbelts,
        seatbeltType: r.seatbeltType,
        condition: r.condition,
        value: r.value,
        vin: r.vin,
        mileage: r.mileage,
        transmission: r.transmission,
        salesTaxPaid: r.salesTaxPaid,
        trim: r.trim,
        bodyStyle: r.bodyStyle,
        hasSalvageTitle: r.hasSalvageTitle,
        extraInfo: r.extraInfo,
        userId: r.userId,
      },
      address: {
        id: r.address_id,
        street: r.street,
        apartment: r.apartment,
        city: r.city,
        state: r.state,
        zip: r.zip,
        country: r.country,
        latitude: r.latitude,
        longitude: r.longitude,
      },
      distanceMeters: r.distance,
    }));
  }
}
