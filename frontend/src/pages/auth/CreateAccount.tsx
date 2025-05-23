import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profiles } from "@/json";
import { CivicAuthProvider } from "@civic/auth/react";
import { CustomCreateAccountBtn } from "@/components";
import { configKeys } from "@/config";
import { UserTypeIcon } from "@/components";
import OnboardingLayout from "@/layout/OnboardingLayout";
import clsx from "clsx";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const getAnimationClass = (title: string): string => {
    switch (title) {
      case "GratiStar":
        return "bounce-in-right";
      case "GratiFan":
        return "bounce-in-left";
      default:
        return "";
    }
  };

  useEffect(() => {
    document.title = "GratiFi | Create Account";
  }, []);

  return (
    <CivicAuthProvider clientId={configKeys.clientId}>
      <OnboardingLayout menu={[]}>
        <div className="h-screen w-full px-[7.5%] pt-[100px] md:pt-[150px] py-8 flex flex-col items-center justify-center gap-8 md:gap-10">
          <h1 className="bg-secondary dark:bg-transparent text-main dark:text-primary font-bold text-center text-xl md:text-3xl lg:text-4xl font-calSans">
            Join as a GratiFan or GratiStar
          </h1>

          <div className="flex flex-wrap flex-col md:flex-row justify-center items-center gap-5 w-full">
            {profiles.map((profile) => (
              <div
                key={profile.title}
                onClick={() => setSelectedProfile(profile.title)}
                className={clsx(
                  "group relative w-full md:w-80 h-48 md:h-72 border border-b-[20px] border-main bg-white dark:bg-dark p-5 animated_cursor cursor-pointer flex flex-col justify-between transition-all duration-300 ease-in-out bg-to-top-main bg-[length:100%_0%] bg-bottom bg-no-repeat hover:bg-[length:100%_100%] hover:shadow-lg hover:shadow-black/50",
                  getAnimationClass(profile.title)
                )}
              >
                <div className="flex justify-between items-center">
                  <profile.icon
                    className={clsx(
                      "text-main text-2xl transition-colors duration-500 group-hover:text-white",
                      profile.title === "GratiFan"
                        ? "group-hover:animate-spin"
                        : "group-hover:animate-bounce"
                    )}
                  />
                  <div className="relative">
                    <input
                      type="radio"
                      name="signup-type"
                      checked={selectedProfile === profile.title}
                      onChange={() => setSelectedProfile(profile.title)}
                      className={clsx(
                        "appearance-none w-7 h-7 border border-gray-300 dark:border-gray-800 rounded-full transition-colors duration-300 checked:bg-white dark:checked:bg-dark checked:border-main dark:checked:border-primary"
                      )}
                    />
                    <div
                      className={clsx(
                        "absolute w-5 h-5 inset-0 m-1 rounded-full bg-secondary dark:bg-primary transition-all duration-300",
                        selectedProfile === profile.title
                          ? "scale-100"
                          : "scale-0"
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-main dark:text-primary transition-colors duration-300 group-hover:text-white text-lg">
                    {profile.title}
                  </h3>
                  <p className="text-main/70 dark:text-primary/70 transition-colors duration-300 group-hover:text-white text-sm">
                    {profile.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-5 mt-8 w-full">
            <CustomCreateAccountBtn
              disabled={!selectedProfile}
              selectedProfile={selectedProfile ?? undefined}
              className={clsx(
                "rounded-full flex justify-center items-center gap-2 font-calSans font-medium text-main transition-all duration-300 w-full py-3 text-sm md:w-[220px] md:text-base",
                selectedProfile
                  ? "bg-primary hover:bg-primaryHover cursor-pointer"
                  : "bg-gray-300 dark:bg-gray-800 cursor-not-allowed dark:text-primary"
              )}
            >
              {selectedProfile ? `Join as a ${selectedProfile}` : "Join"}
              {selectedProfile && (
                <UserTypeIcon userType={selectedProfile} size={18} />
              )}
            </CustomCreateAccountBtn>

            <p className="text-main/70 dark:text-primary/70 text-sm text-center">
              Already have a GratiFi account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-main dark:text-primary font-calSans font-medium hover:underline cursor-pointer"
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </OnboardingLayout>
    </CivicAuthProvider>
  );
}
