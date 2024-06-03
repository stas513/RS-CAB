import React from "react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="max-w-container mx-auto px-5">
      <div className="bg-black bg-cover px-5 bg-center rounded-tr-large rounded-tl-large  mt-8">
        <div className=" flex justify-center content-center ">
          <h1 className="max-w-full h-56  text-white text-center md:text-7xl  font-semibold  md:pt-16 text-4xl pt-24 ">
            What Our Clients Think
          </h1>
        </div>
        <div className="flex content-center justify-center">
          <Image
            className="md:h-28 relative sm:right-[-65px] sm:h-24 h-14 right-[-40px]"
            width={210}
            height={120}
            src={"/webAssets/images/home/client 03.png"}
            alt=""
          />
          <Image
            className="md:h-40 relative sm:bottom-[25px]  z-10 sm:h-36 h-20 bottom-[14px] left-[-10px]"
            width={280}
            height={150}
            src={"/webAssets/images/home/client 01.png"}
            alt=""
          />
          <Image
            className="md:h-28 relative sm:left-[-65px] sm:h-24 h-14 left-[-40px]"
            width={210}
            height={120}
            src={"/webAssets/images/home/client 02.png"}
            alt=""
          />
        </div>

        <div className="flex content-center justify-center">
          <div className="flex items-center">
            <Image
              className="w-full rotate-180"
              width={41}
              height={41}
              src={"/webAssets/images/home/Group 387.png"}
              alt=""
            />
          </div>
          <p className="text-white text-center  text-[11px] sm:text-[15px] max-w-xl">
            Lorem ipsum dolor sit amet elit. Quae.Animi velit modi tempore quos
            fugit eius, veritatis temporibus odio Lorem ipsumdolor, sit amet
            consectetur adipisicing.
          </p>
          <div className="flex items-center">
            <Image
              className="w-full"
              width={41}
              height={41}
              src={"/webAssets/images/home/Group 387.png"}
              alt=""
            />
          </div>
        </div>

        <div className="max-w-subcontainer mx-auto mt-16 flex flex-wrap gap-4 mb-20  justify-between">
          <div className=" max-w-md  p-3 ">
            <Image
              className="mb-2"
              width={120}
              height={120}
              src={"/webAssets/images/home/footer logo.png"}
              alt=""
            />
            <p className="text-white pl-3 mb-8 text-[15px]">
              Lorem ipsum dolor sit amet sit amet consectetur, adipisicing elit
              Repellat necessitatibus architecto.
            </p>
            <div className="space-x-4 p-3 ">
              <Image
                className="w-8"
                width={20}
                height={20}
                src={"/webAssets/images/home/facebook (2).png"}
                alt=""
              />
              <Image
                className="w-8"
                width={20}
                height={20}
                src={"/webAssets/images/home/twitter (1).png"}
                alt=""
              />
              <Image
                className="w-8"
                width={20}
                height={20}
                src={"/webAssets/images/home/instagram (2).png"}
                alt=""
              />
              <Image
                className="w-8"
                width={20}
                height={20}
                src={"/webAssets/images/home/linkedin (1).png"}
                alt=""
              />
            </div>
          </div>
          <div className=" text-white  p-3">
            <h3 className="font-bold mb-5">QUICK LINKS</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  HOME
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  ABOUT
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  SERVICES
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  DRIVER
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  USER
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
          <div className=" text-white  p-3">
            <h3 className="font-bold mb-5">SERVICES</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  Lorem ipsum
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  Lorem ipsum
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  Lorem ipsum
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  Lorem ipsum
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  Lorem ipsum
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm" href="#">
                  Lorem ipsum{" "}
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-white p-3 ">
            <h3 className="font-bold mb-5">CONTACT US </h3>
            <div className="flex mb-3 items-center">
              <div className="flex items-center">
                <Image
                  width={11}
                  height={8}
                  src={"/webAssets/images/home/Group 126.png"}
                  alt=""
                />
              </div>
              <p className="ml-2 text-[14px] object-contain">
                982 Southampton St. <br /> lorem ispum lake
              </p>
            </div>
            <div className="flex mb-3">
              <div className="flex items-center">
                <Image
                  width={11}
                  height={11}
                  src={"/webAssets/images/home/Group 127.png"}
                  alt=""
                />
              </div>
              <p className="ml-2 text-[14px] object-contain ">000-000-000</p>
            </div>
            <div className="flex mb-3">
              <div className="flex items-center">
                <Image
                  width={11}
                  height={11}
                  src={"/webAssets/images/home/Group 125.png"}
                  alt=""
                />
              </div>
              <p className="ml-2 text-[14px] object-contain ">
                contact@crscab.com
              </p>
            </div>
            <div className="flex mt-16 flex-wrap">
              <Image
                className="w-40 mb-8"
                width={180}
                height={60}
                src={"/webAssets/images/home/Image 24.png"}
                alt=""
              />
              <Image
                className="w-40 mb-8"
                width={180}
                height={60}
                src={"/webAssets/images/home/Image 25.png"}
                alt=""
              />
            </div>
          </div>
        </div>
        <hr />
        <footer>
          <p className="text-center text-white justify-center text-[11px] sm:text-[17px]">
            &copy; 2023 RSCAB Ltd Privacy Policy Terms of Service
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
