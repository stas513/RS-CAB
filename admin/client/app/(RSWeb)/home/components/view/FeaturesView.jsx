import Image from 'next/image'
import React from 'react'

const FeaturesView = () => {
    return (
        <section className="max-w-subcontainer px-5 mx-auto my-24 flex flex-col md:flex-row md: justify-between">
            <div className="md:w-[440px] text-center md:text-left">
                <h3 className="text-blue font-poppins text-6xl font-medium">
                    Relax, You're In Control
                </h3>
                <p className="font-poppins my-5">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
                    adipisci id ipsa nam veniam rem eum laudantium, earum sint obcaecati
                    commodi optio quae sunt deserunt impedit corrupti aut. Illo, maiores.
                </p>

                <button className="bg-green py-3 px-6 rounded-md font-semibold text-sm font-poppins">
                    KNOW MORE
                </button>
            </div>
            <div className="md:relative md:w-[660px]">
                <div className="absolute top-0 right-0 md:flex md:justify-end hidden">
                    <Image className="w-2/3" width={430} height={153} src={"/webAssets/images/home/newHomeVector.png"} alt="" />
                </div>
                <div className="md:w-[407px] px-10 my-5 py-6 mt-20 bg-sky-600 md:absolute">
                    <Image className="w-14 mb-5" width={57} height={50} src={"/webAssets/images/home/Icon material-local-car-wash.png"} alt="" />
                    <p className="text-white text-lg md:w-3/5 font-poppins">
                        Reliable & On-Time Business Transport
                    </p>
                </div>
                <div className="md:w-[407px] px-10 my-5 py-6 bg-blue md:absolute md:top-48 md:right-0 md:ps-40 box-border">
                    <Image className="w-14 mb-5" width={57} height={50} src={"/webAssets/images/home/Icon ionic-md-call.png"} alt="" />
                    <p className="text-white text-lg md:w-1/1 font-poppins">
                        Customer Services You Can Talk To
                    </p>
                </div>
                <div className="md:w-[407px] px-10 my-5 py-6 bg-dark-green md:absolute md:bottom-[-160px] md:left-[-40px]">
                    <Image className="w-14 mb-5" width={57} height={50} src={"/webAssets/images/home/Icon ionic-ios-happy.png"} alt="" />
                    <p className="text-white text-lg md:w-4/5 font-poppins">
                        Technology That's <br />
                        Insightful & A Joy To Use
                    </p>
                </div>
            </div>
        </section>

    )
}

export default FeaturesView