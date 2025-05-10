import { useUser } from "@civic/auth/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomCreateAccountBtn({
  disabled,
  selectedProfile,
  className,
  children,
}: {
  disabled?: boolean;
  selectedProfile?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { signIn, user } = useUser();

  const handleCreateAccount = useCallback(async () => {
    try {
      await signIn();

      if (selectedProfile) {
        const profilePath = selectedProfile.toLowerCase().replace(" ", "-");
        navigate(`/dashboard/${profilePath}`);
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate, selectedProfile, signIn]);

  return (
    <>
      {!user && (
        <button
          disabled={disabled}
          className={className}
          onClick={handleCreateAccount}
        >
          {children}
        </button>
      )}
    </>
  );
}
