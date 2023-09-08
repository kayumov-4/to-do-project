import React, { useState, useEffect } from "react";
import {
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Modal, Upload, Input } from "antd";
import Breadcrumb from "../../components/UI/BreadCrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ProfilePage = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [editModal, setEditModal] = useState(true);
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    setTimeout(() => {
      navigate("/");
      location.reload();
    }, 1000);
  };

  useEffect(() => {
    setEditModal(false);
  }, []);
  return (
    <div className="container mx-auto min-w-[1272px] px-[32px] w-full">
      <Breadcrumb />
      {editModal ? (
        <div className="w-[700px] h-[550px] p-10 shadow-2xl bg-white dark:bg-[#222327] mx-auto flex flex-col items-center mt-[100px] rounded-xl relative">
          <h1 className="text-black text-3xl dark:text-white">Edit Profile</h1>
          <div className="inputs flex flex-col w-full gap-5 mt-10">
            <div className="flex items-center justify-between w-full gap-5">
              <Input
                className="dark:bg-[#2A2B2F] h-10 placeholder:text-black dark:placeholder:text-white dark:text-white "
                placeholder="First Name"
              />
              <Input
                className="dark:bg-[#2A2B2F] h-10 placeholder:text-black dark:placeholder:text-white dark:text-white"
                placeholder="Last Name"
              />
            </div>
            <div className="flex items-center justify-between w-full gap-5">
              <Input
                className="dark:bg-[#2A2B2F] h-10 placeholder:text-black dark:placeholder:text-white dark:text-white"
                placeholder="Username"
              />
              <Input
                className="dark:bg-[#2A2B2F] h-10 placeholder:text-black dark:placeholder:text-white dark:text-white"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center justify-between w-full gap-5">
              <Input
                className="dark:bg-[#2A2B2F] h-10 placeholder:text-black dark:placeholder:text-white dark:text-white"
                placeholder="Password"
              />
              <Input
                className="dark:bg-[#2A2B2F] h-10 placeholder:text-black dark:placeholder:text-white dark:text-white"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-end w-full gap-3 absolute bottom-10 right-10">
            <Button
              onClick={() => setEditModal(false)}
              type="default"
              className="px-10 py-5   mt-5 flex items-center justify-center dark:text-[white]"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setEditModal(false)}
              type="default"
              className="px-10 py-5   mt-5 flex items-center justify-center dark:text-[white]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-[700px] h-[550px] p-10 shadow-2xl bg-white dark:bg-[#222327] mx-auto flex flex-col items-center justify-center mt-[100px] rounded-xl">
          <div>
            <Upload
              className="w-[100px] h-[100px] dark:text-[#bfbfbf]"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
          <h1 className="text-center my-5 mr-2 text-3xl dark:text-[#bfbfbf]">
            {userName}
          </h1>

          <div className=" flex items-center mr-2 justify-center text-xl gap-10">
            <h3 className="dark:text-[#bfbfbf]">{firstName}</h3>
            <h3 className="dark:text-[#bfbfbf]">{lastName}</h3>
          </div>
          <div className="flex gap-3 mt-5  mr-2 text-lg">
            <p className="dark:text-[#bfbfbf]">Email :</p>
            <strong className="dark:text-[#bfbfbf]">{email}</strong>
          </div>
          <div className="flex gap-3 mt-5  mr-2 text-lg">
            <p className="dark:text-[#bfbfbf]">Password :</p>
            <strong className="dark:text-[#bfbfbf]">*********</strong>
          </div>
          <div className="btns flex flex-col mr-2">
            <Button
              onClick={() => setEditModal(true)}
              type="default"
              className="px-10 py-3 flex items-center my-8 justify-center dark:text-[#bfbfbf] text-black "
            >
              Edit
            </Button>
          </div>

          <AlertDialog className="dialog">
            <AlertDialogTrigger>
              <Button
                type="default"
                className="px-10 py-5  mr-2 mt-10 flex items-center justify-center text-black dark:text-[#bfbfbf]"
              >
                Log Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="content text-white">
              <AlertDialogHeader className="">
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently logout
                  your account and after this you need to sign in.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black dark:text-[#bfbfbf]">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={logOut}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};
export default ProfilePage;
