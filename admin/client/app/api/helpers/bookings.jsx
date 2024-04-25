import prisma from '@/database/prisma';
import { addressFieldChecker } from '../utils/addressFieldChecker';



export const findAllBookings = async () => {
    const result = await prisma.booking.findMany({
        include: {
            driverInfo: {
                include: {
                    userInfo: true,
                    document: true,
                    car: {
                        include: {
                            carDocument: true
                        }
                    }
                }
            },
            cartInfo: {
                include: {
                    startFrom: true,
                    destination: true,
                    stopages: true,
                    packageInfo: true
                }
            },
            passengerInfo: {
                include: { userInfo: true },
            }
        }
    });


    return result
}

export const findAllRideRequest=async () =>{
    const result = await prisma.cart.findMany({
        include: {
            startFrom:true,
            destination:true,
            stopages:true,
            packageInfo:true,
            passengerInfo:true
        }
    });


    return result
}
export const findBooking = async (id) => {
    const result = await prisma.booking.findMany({
        include: {
            driverInfo: {
                include: {
                    userInfo: true,
                    document: true,
                    car: true
                }
            },
            cartInfo: {
                include: {
                    startFrom: true,
                    destination: true,
                    stopages: true
                }
            },
            passengerInfo: {
                userInfo: true,
            }
        },
        where: { id }
    });
    return result
}

export const createBooking = async (data) => {
    const result = await prisma.Booking.create({ data })
    return result
}
export const findAllRideBidRequest=async (id) =>{

    const result = await prisma.cart.findMany({
        where:{
            id
        },
        include: {
            requestInfo:true,
            driverInfo:true,
            passengerInfo:true,
        }
    });


    return result
}
export const createBidPlace = async (data) => {
    const result = await prisma.Bidplace.create({data})
    return result 

}
export const findCart = async () => {
    const result = await prisma.cart.findUnique({
        include: {
            startFrom: true,
            destination: true,
            stopages: true
        },
        where: { id }
    });
    return result
}


export const createCart = async (data, startFromId, destinationId) => {
    const tempData = { ...data, startFromId, destinationId }

    delete tempData.startAddress;
    delete tempData.destinationAddress;
    delete tempData.stopages;
    const cart = await prisma.Cart.create({ data: {
        ...tempData,
        totalBill:Number(tempData.totalBill),
        totalDistance:Number(tempData.totalDistance)
    }})
    return cart
}

export const createAddress = async (data) => {
    const address = await prisma.Address.create({ data })
    return address
}

export const createStopages = async (stopages, cartId,userId) => {
    if (stopages?.length && cartId) {
        const result = [];
        for (let i = 0; i < stopages?.length - 1; ++i) {
            const stopagesFields = addressFieldChecker(stopages[i])
            if (stopagesFields) {
                const newStopages = await createAddress({ ...stopages[i], cartId,userId })
                result.push(newStopages)

            }
        }
        return result
    }

}

