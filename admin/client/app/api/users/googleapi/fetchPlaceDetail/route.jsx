import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(req) {
    const { place } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=geometry,address_components&key=${apiKey}`
        );

        const { lat, lng } = response?.data?.result?.geometry?.location;

          // Extract postal code and house number from address components
          const addressComponents = response?.data?.result?.address_components;
          let postCode = "";
          let houseNumber = "";
          let city = "";

          for (const component of addressComponents) {
            if (component?.types?.includes("postal_code")) {
              postCode = component?.short_name;
            }
            if (component.types.includes("street_number")) {
              houseNumber = component?.short_name;
            }
            if (component.types.includes("locality")) {
              city = component?.long_name;
            }
          }
          const data = {
            name: place.description,
            latitude: lat.toString(),
            longitude: lng.toString(),
            postCode,
            houseNumber,
            city,
          };

          return NextResponse.json(data, {
            status: 200
        });;

      } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message}, {
            status: 400,
        });;
      }
}

