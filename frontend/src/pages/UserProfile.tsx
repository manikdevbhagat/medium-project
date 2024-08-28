import React, { useState, useEffect } from "react";
import userService from "@/features/services/userService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

interface UserProfile {
  name: string;
  email: string;
  password: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    password: "********",
  });
  const [fetchLoading, setFetchLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setFetchLoading(true);
      const data = await userService.getUserProfile();
      setProfile({ ...profile, name: data.user.name, email: data.user.email });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    try {
      setSaveLoading(true);
      await userService.editUserProfile(profile);
      toast.success("Profile saved successfully!");
      setProfile({ ...profile, password: "********" });
      console.log("Profile saved successfully!");
    } catch (error) {
      console.error("Failed to save user profile:", error);
      toast.error("Failed to save user profile");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-5">
      <Card className="mt-12 w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                {fetchLoading ? (
                  <Skeleton className="w-full h-[40px]" />
                ) : (
                  <Input
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={profile.name}
                    onChange={handleInputChange}
                  />
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                {fetchLoading ? (
                  <Skeleton className="w-full h-[40px]" />
                ) : (
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                {fetchLoading ? (
                  <Skeleton className="w-full h-[40px]" />
                ) : (
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={profile.password}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={saveProfile} disabled={saveLoading || fetchLoading}>
            {saveLoading ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
