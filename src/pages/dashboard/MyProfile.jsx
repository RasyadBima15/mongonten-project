import { useEffect, useState } from "react";
import { getSelectedAccount } from "../../api/private.service";
import AuthNav from "../../components/AuthNav";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import InputImage from "../../components/InputImage";
import Button from "../../components/Button";

const MyProfile = ({ token }) => {
  const [userData, setUserData] = useState({
    name: "",
    domicile: "",
    slug: "",
    bio: "",
    photo: "",
  });
  const [newUserData, setNewUserData] = useState({
    name: "",
    domicile: "",
    slug: "",
    bio: "",
    photo: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const data = await getSelectedAccount(token.user.id);
      setUserData({
        name: data[0].name,
        domicile: data[0].domicile,
        slug: data[0].slug,
        bio: data[0].bio,
        photo: data[0].photo,
      });
    };
    getUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  return (
    <div>
      <AuthNav />
      <div className="pt-24 px-4 pb-10">
        <h1 className="text-2xl text-center font-semibold">PROFIL SAYA</h1>

        <div className="divider" />
        <form
          // onSubmit={handleSubmit}
          className="flex flex-wrap gap-8 px-3 justify-between w-full lg:w-9/12"
        >
          <div className="w-full lg:basis-2/4">
            <Input
              label="Nama Lengkap"
              isRequire
              name="fullname"
              placeholder="John Doe"
              value={userData.name}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="w-full lg:basis-2/4">
            <Input
              label="Domisili"
              isRequire
              name="location"
              placeholder="Makassar"
              value={userData.domicile}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="w-full lg:basis-1/3">
            <Input
              label="URL"
              isRequire
              name="slug"
              placeholder="your.name"
              value={userData.slug}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="w-full lg:basis-2/4">
            <TextArea
              label="Bio (pengenalan singkat)"
              name="bio"
              placeholder="I am..."
              value={userData.bio}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full lg:basis-1/3 items-start">
            <InputImage
              label="Foto"
              name="photo"
              selectedImage={userData.photo}
              // handleImageChange={handleImageChange}
            />
          </div>

          <Button
            label={
              "SIMPAN"
              // userData.account.fullname !== "(Your Full Name...)"
              //   ? "UPDATE"
              //   : "SAVE"
            }
          />
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
