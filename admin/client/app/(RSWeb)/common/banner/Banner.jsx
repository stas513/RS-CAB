import React from 'react';
import Image from 'next/image'



const Banner = () => {
    return (
        <div className="max-w-subcontainer mx-5 md:mx-auto px-5 my-32 h-[400px] bg-gray rounded-medium relative p-5 md:ps-20">

            <div className="md:w-1/2 h-full flex flex-col justify-center gap-5">
                <div className="flex">
                    <div className="">
                        <Image className="w-[80px] object-contain" width={81} height={73} src={"/webAssets/images/home/Group 394.png"} alt="" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h5 className="text-blue font-poppins font-semibold mb-1 ">RS CAB APP</h5>
                        <div className="flex space-x-2">
                            <Image className="w-5" width={17} height={17} src={"/webAssets/images/home/Icon ionic-ios-star.png"} alt="star" />
                            < Image className="w-5" width={17} height={17} src={"/webAssets/images/home/Icon ionic-ios-star.png"} alt="star" />
                            < Image className="w-5" width={17} height={17} src={"/webAssets/images/home/Icon ionic-ios-star.png"} alt="star" />
                            < Image className="w-5" width={17} height={17} src={"/webAssets/images/home/Icon ionic-ios-star.png"} alt="star" />
                            < Image className="w-5" width={17} height={17} src={"/webAssets/images/home/Icon ionic-ios-star.png"} alt="star" />
                        </div>
                    </div>
                </div>

                <h1 className="text-blue text-6xl font-poppins font-semibold">Mobile App</h1>

                <p className="text-xl font-poppins">Freedom Of Choice And Movement - <br /> One App For Rides</p>

                <div>
                    <button className="bg-green font-poppins py-3 px-6 rounded-md font-semibold text-sm">
                        DOWNLOAD THE APP
                    </button>
                </div>
            </div>

            <Image className="w-1/2 absolute bottom-0 right-8" width={548} height={437} src={"/webAssets/images/home/Image 23.png"} alt="mobile" />

        </div>
    )
}

export default Banner