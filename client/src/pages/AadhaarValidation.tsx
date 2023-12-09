import { ChangeEventHandler, useEffect, useState } from "react";
import { useVerified } from "../hooks/useVerified";
import { useNavigate } from "react-router-dom";
import { useTraits } from "../hooks/useTraits";

export const AadhaarValidation = () => {
    const [aadhaar, setAadhaar] = useState<File>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();
    const { verify, loading, isVerified, fetched } = useVerified();
    const { areTraitsSelected, fetched: tsFetched } = useTraits();

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setAadhaar(e.target.files![0]);
    };

    const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        if (!aadhaar || !password) {
            alert("Please enter aadhaar and password");
            return;
        }
        const verified = await verify(aadhaar!, password!);
        if (verified) {
            navigate("/selectTraits");
        } else {
            alert("Invalid aadhaar or password");
        }
    };

    useEffect(() => {
        console.log({ fetched, isVerified, areTraitsSelected, tsFetched });
        if (fetched && isVerified) {
            navigate("/");
        }
    }, [isVerified, fetched, areTraitsSelected, tsFetched]);

    return (
        <div className="relative flex items-center justify-evenly gap-[150px] mt-[120px]">
            <div className="w-[350px] h-[350px] rounded-full bg-white/20">
                <img src="logo.png" className="rounded-3xl shadow-xl" />
            </div>
            <div className="flex flex-col gap-4 bg-white/20 p-6 shadow-xl rounded-2xl">
                <h1 className="my-3 text-left">
                    We believe 🙈 <br /> It's you
                </h1>
                <div className="mb-3 border-t-[1px] border-gray-200" />
                <div className="flex flex-col gap-2">
                    <span className="text-left font-bold">Select Aadhaar</span>
                    <input
                        type="file"
                        className="block w-full text-lg text-white  rounded-xl cursor-pointer  outline-none dark:bg-white/30 "
                        onChange={handleFileChange}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                    <span className="text-left font-bold"> Enter Password</span>
                    <input
                        type="password"
                        className="rounded-2xl font-bold px-3 py-2 bg-white/30 outline-none"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button disabled={loading} onClick={handleSubmit}>
                    {loading ? "Loading" : "Submit"}
                </button>
            </div>
            <div className="absolute right-1 bottom-[-24px] text-sm">
                powered by <strong>Anon Aadhaar 🪪</strong>
            </div>
        </div>
    );
};
