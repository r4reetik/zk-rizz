import { ChangeEventHandler, useEffect, useState } from "react";
import { useVerified } from "../hooks/useVerified";
import { useNavigate } from "react-router-dom";

export const AadhaarValidation = () => {
    const [aadhaar, setAadhaar] = useState<File>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();
    const { verify, loading, isVerified, fetched } = useVerified();

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
        if (fetched && isVerified) {
            navigate("/");
        }
    }, [isVerified, fetched]);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="my-3">Aadhaar Validation</h1>
            <div className="flex flex-col gap-2">
                <span className="text-left"> Select Aadhaar</span>
                <input type="file" onChange={handleFileChange} />
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-left"> Enter Password</span>
                <input type="text" onChange={handlePasswordChange} />
            </div>
            <button disabled={loading} onClick={handleSubmit}>
                {loading ? "Loading" : "Submit"}
            </button>
        </div>
    );
};
