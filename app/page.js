import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-1 justify-center text-white h-[45vh] items-center">
        <div className="text-4xl font-bold flex items-center">
          BUY ME A CHAI!{" "}
          <span>
            <Image
              className="pb-2 invert-[0.23]"
              width={50}
              height={50}
              src="/chai.gif"
              alt=""
            />
          </span>
        </div>
        <p>A Crowfunding Platform for Chai Community</p>
        <div>
          <Link href="/login">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start Here
          </button>
          </Link>
          <Link
            href="https://github.com/Pradyumn-Chaudhary/Get-Me-A-Chai"
            target="_blank"
          >
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Github
            </button>
          </Link>
        </div>
      </div>
      <div className="h-1 opacity-10 bg-white"></div>
      <div className="text-white h-[50vh] flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center my-3">
          Your People Can Buy You a Chai
        </h2>
        <div className="flex gap-5 justify-evenly">
          <div className="item flex flex-col items-center text-center">
            <Image
              className="bg-slate-400 p-1 rounded-full mb-2"
              width={100}
              height={100}
              src="/man.gif"
              alt=""
            />
            <p className="font-bold">People Wants To Help</p>
            <p>Your Friends are Available for you</p>
          </div>
          <div className="item flex flex-col items-center text-center">
            <Image
              className="bg-slate-400 p-1 rounded-full mb-2"
              width={100}
              height={100}
              src="/coin.gif"
              alt=""
            />
            <p className="font-bold">People Wants To Help</p>
            <p>Your Friends are Available for you</p>
          </div>
          <div className="item flex flex-col items-center text-center">
            <Image
              className="bg-slate-400 p-1 rounded-full mb-2"
              width={100}
              height={100}
              src="/group.gif"
              alt=""
            />
            <p className="font-bold">People Wants To Help</p>
            <p>Your Friends are Available for you</p>
          </div>
        </div>
      </div>

      <div className="h-1 opacity-10 bg-white"></div>
      <div className="text-white flex flex-col justify-center m-7">
        <h2 className="text-2xl font-bold my-3">Learn More About us</h2>
        <p>
          Welcome to Get Me a Chai, a platform built to fuel dreams—one chai at
          a time! We believe in the power of small contributions making a big
          impact. Whether you're a creator, an entrepreneur, or just someone
          chasing their passion, we're here to help you raise funds
          effortlessly.
        </p>
        <h3 className="font-bold text-2xl my-3">Why Get Me a Chai?</h3>
        <p>
          💡 <span className="font-bold">Simple & Fun:</span> Just like buying a
          friend a chai, supporters can contribute small amounts to help you
          achieve your goals. <br />
          🚀 <span className="font-bold">Empowering Creators:</span> Whether
          you're an artist, writer, developer, or innovator, we make fundraising
          easy and engaging.
          <br />
          ❤️ <span className="font-bold">Community-Driven:</span> Every
          contribution, big or small, helps bring ideas to life.
        </p>
        <h3 className="font-bold text-2xl my-3">How It Works?</h3>
        <p>
          1️⃣ Set up your profile and share your story.
          <br />
          2️⃣ Your supporters buy you a chai (small donation).
          <br />
          3️⃣ Funds help you sustain and grow your passion.
        </p>
        <h3 className="font-bold text-2xl my-3">
          Join Us in Making a Difference!
        </h3>
        <p>
          Your support means the world! Whether you contribute or share, every
          action helps us create a world where creativity and ideas thrive.
        </p>
      </div>
    </>
  );
}
