function Hero() {
  return (
    <section className="w-full h-screen px-[7.5%] pt-[150px] pb-[50px]">
      <div className="w-full h-full flex justify-between items-center rounded-[15px] gap-5">
        <div className="w-full h-full flex flex-col flex-1 justify-end border border-[red]">
          <p className="bg-[pink]">Tips should be simple</p>
          <h1>Tip Effortlessly, Thank Generously</h1>
          <p>
            Quick, secure and heartfelt - showing your appreciation has never
            been easier
          </p>
        </div>

        <div className="w-full h-full flex flex-col flex-1 justify-end border border-[orange]">
          image here
        </div>
      </div>
    </section>
  );
}

export default Hero;
