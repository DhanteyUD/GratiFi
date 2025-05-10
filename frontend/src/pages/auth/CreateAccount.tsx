import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profiles } from "@/json";
import AppLayout from "@/layout/AppLayout";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleCreateAccount = () => {
    if (selectedProfile) {
      const profilePath = selectedProfile.toLowerCase().replace(" ", "-");
      navigate(`/dashboard/${profilePath}`);
    }
  };

  const getAnimationClass = (title: string): string => {
    switch (title) {
      case "Employer":
        return "bounce-in-right";
      case "Job Seeker":
        return "bounce-in-left";
      default:
        return "";
    }
  };

  useEffect(() => {
    document.title = "GratiFi | Create Account";
  }, []);

  return (
    <AppLayout menu={[]}>
      <div className="h-screen w-full px-[7.5%] pt-[100px] md:pt-[150px] py-8 flex flex-col items-center justify-center gap-8 md:gap-10">
        <h1 className="bg-secondary text-main font-bold text-center text-xl md:text-3xl lg:text-4xl font-calSans">
          Join as a job seeker or employer
        </h1>

        <div className="flex flex-wrap flex-col md:flex-row justify-center items-center gap-5 w-full">
          {profiles.map((profile) => (
            <div
              key={profile.title}
              onClick={() => setSelectedProfile(profile.title)}
              className={`group relative w-full md:w-80 h-48 md:h-72 border border-b-[20px] border-main bg-white p-5 animated_cursor cursor-pointer flex flex-col justify-between transition-all duration-300 ease-in-out bg-custom-main bg-[length:100%_0%] bg-bottom bg-no-repeat hover:bg-[length:100%_100%] hover:shadow-lg hover:shadow-black/50 ${getAnimationClass(
                profile.title
              )}`}
            >
              <div className="flex justify-between items-center">
                <profile.icon className="text-main text-2xl transition-colors duration-500 group-hover:text-white" />
                <div className="relative">
                  <input
                    type="radio"
                    name="signup-type"
                    checked={selectedProfile === profile.title}
                    onChange={() => setSelectedProfile(profile.title)}
                    className="
                        appearance-none w-7 h-7 border border-gray-300 rounded-full 
                        transition-colors duration-300
                        checked:bg-white checked:border-main
                      "
                  />
                  <div
                    className={`
                        absolute w-5 h-5 inset-0 m-1 rounded-full bg-secondary
                        transition-all duration-300
                        ${
                          selectedProfile === profile.title
                            ? "scale-100"
                            : "scale-0"
                        }
                      `}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-main transition-colors duration-300 group-hover:text-white text-lg">
                  {profile.title}
                </h3>
                <p className="text-main/70 transition-colors duration-300 group-hover:text-white text-sm">
                  {profile.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-5 mt-8 w-full">
          <button
            disabled={!selectedProfile}
            onClick={handleCreateAccount}
            className={`rounded-full font-medium text-main transition-all duration-300 w-full py-3 text-sm md:w-52 md:py-2 md:text-base font-calSans
                ${
                  selectedProfile
                    ? "bg-primary hover:bg-primaryHover"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
          >
            Join
            {selectedProfile &&
              ` as ${
                selectedProfile === "Employer" ? "an" : "a"
              } ${selectedProfile}`}
          </button>

          <p className="text-main/70 text-sm">
            Already have a Jobmacho account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-primary font-calSans font-medium hover:underline cursor-pointer"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
