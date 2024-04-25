import React from "react";
import Image from "next/image";
const ServicesView = () => {
  return (
    <div className="bg-green-bg bg-cover py-28 md:py-32 w-full my-3 md:mt-32">
      <div className="max-w-subcontainer px-5 mx-auto h-full flex items-center">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2 md:col-span-1">
            <h3 class="text-white text-center md:text-left font-poppins text-4xl md:text-6xl font-semibold leading-normal">
              Join Our Journey
            </h3>
            <p class="text-white text-justify font-poppins mt-5 md:mt-16 leading-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
              adipisci id ipsa nam veniam rem eum laudantium, earum sint
              obcaecati commodi optio quae sunt deserunt impedit corrupti aut.
              Illo, maiores. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Illum adipisci id ipsa nam veniam rem eum laudantium, earum
              sint obcaecati commodi optio quae sunt deserunt impedit corrupti
              aut. Illo, maiores.
            </p>
          </div>
          <div className="col-span-2 md:col-span-1 place-self-end">
            <div className="md:max-w-[488px] ">
              <Image
                className="rounded-[34px] w-full object-contain"
                width={489}
                height={363}
                src={"/webAssets/images/about/Join Our Journey image.png"}
                alt="Team"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesView;
