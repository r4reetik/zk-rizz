import { ChangeEventHandler, useEffect, useState } from "react";
import { toTitleCase } from "../lib/utils";
import { useTraits } from "../hooks/useTraits";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../hooks/useWeb3";

export const TraitSelector = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [yourTraits, setYourTraits] = useState<string[]>([]);
    const [wantedTraits, setWantedTraits] = useState<string[]>([]);
    const [yourAge, setYourAge] = useState(21);
    const [wantedAge, setWantedAge] = useState(21);
    const [yourGender, setYourGender] = useState("Male");
    const [wantedGender, setWantedGender] = useState("Female");
    const navigate = useNavigate();
    const { account } = useWeb3();
    const { loading, selectTraits, areTraitsSelected, fetched } = useTraits();

    const categories: Record<string, string[]> = {
        creativity: [
            "🎨 Art",
            "📷 Photography",
            "🕺🏻 Dance",
            "🎵 Music",
            "🧩 Puzzles",
        ],
        interests: ["👨🏻‍💻 Hackathons", "🎬 Movies", "⛓️ Blockchain"],
        sports: [
            "🏀 Basketball",
            "⚽️ Football",
            "🏏 Cricket",
            "♟️ Chess",
            "🔴 Carrom",
        ],
        personality: [
            "🉑 Weeb",
            "🎮 Gamer",
            "🍔 Foodie",
            "🌏 Traveler",
            "📚 Bookworm",
            "🤓 Humourous",
            "🏳️‍🌈 LGBTQ+",
        ],
    };

    const genders = ["Male", "Female", "Other"];

    const handleSubmit = async () => {
        if (!account) return;
        if (wantedTraits.length === 0) {
            return setSelectedTab(1);
        } else if (yourTraits.length === 0) {
            return setSelectedTab(0);
        }
        await selectTraits(
            yourTraits,
            yourAge,
            yourGender === "Male" ? 1 : yourGender === "Female" ? 0 : 2,
            wantedTraits,
            wantedAge,
            wantedGender === "Male" ? 1 : wantedGender === "Female" ? 0 : 2,
            account
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate("/");
    };

    const handleTabChange = (tab: number) => {
        setSelectedTab(tab);
    };
    const handleYourTraitsChange = (trait: string) => {
        if (yourTraits.includes(trait)) {
            setYourTraits(yourTraits.filter((t) => t !== trait));
        } else {
            setYourTraits([...yourTraits, trait]);
        }
    };
    const handleWantedTraitsChange = (trait: string) => {
        if (wantedTraits.includes(trait)) {
            setWantedTraits(wantedTraits.filter((t) => t !== trait));
        } else {
            setWantedTraits([...wantedTraits, trait]);
        }
    };

    const handleOnAgeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setYourAge(Number(e.target.value));
    };

    const handleOnWantedAgeChange: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setWantedAge(Number(e.target.value));
    };

    const handleOnGenderChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setYourGender(e.target.value);
    };

    const handleOnWantedGenderChange: ChangeEventHandler<HTMLSelectElement> = (
        e
    ) => {
        setWantedGender(e.target.value);
    };

    useEffect(() => {
        if (areTraitsSelected && fetched) {
            navigate("/");
        }
    }, [areTraitsSelected, fetched]);

    const tab = (name: string, index: number) => (
        <span
            className={`${
                selectedTab === index &&
                "font-bold text-white bg-primary pl-8 pr-8"
            } py-3  rounded-3xl cursor-pointer text-lg 
            ${index === 0 ? "pl-8" : "pr-8"}
            `}
            onClick={() => handleTabChange(index)}
        >
            {name}
        </span>
    );

    return (
        <div className="flex flex-col p-5 bg-black/10 rounded-2xl shadow-xl">
            <h2 className="mb-4 text-3xl">
                Everyone is <span className="text-4xl font-bold">Unique</span>,
                so are you!
            </h2>
            <div className="m-3 mb-6 border-t-[1px] border-gray-200" />
            <div className="flex flex-col items-center">
                <div className="flex gap-5 w-max place-content-center mb-3 rounded-3xl bg-white/30 ">
                    {tab("What you are", 0)}
                    {tab("What you want", 1)}
                </div>
                {selectedTab === 0 && (
                    <span className="p-1 flex flex-col items-start mt-4">
                        <div className="flex gap-4 items-start mb-4 justify-items-center ">
                            <div>
                                <span className="text-sm font-bold mb-1 pl-1 mr-2">
                                    Age:
                                </span>
                                <input
                                    className="rounded-2xl px-3 py-2 w-[100px] h-[36px] bg-white/20 "
                                    type="tel"
                                    value={yourAge}
                                    onChange={handleOnAgeChange}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold">
                                    Gender:{" "}
                                </span>
                                <select
                                    defaultValue={yourGender}
                                    className="py-2 px-3 rounded-2xl outline-none appearance-none bg-white/20 text-white "
                                    onChange={handleOnGenderChange}
                                >
                                    {genders.map((g) => (
                                        <option key={g} value={g}>
                                            {g}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {Object.keys(categories).map((category) => (
                            <div
                                key={category}
                                className="flex flex-col items-start pb-4"
                            >
                                <span className="p-1 mb-1 text-sm font-bold">
                                    {toTitleCase(category)}
                                </span>
                                <div className="flex gap-2 ">
                                    {categories[category].map((trait) => (
                                        <span
                                            key={trait}
                                            className={
                                                "px-3 py-2 border border-white/30 rounded-[16px] cursor-pointer " +
                                                (yourTraits.includes(trait) &&
                                                    "bg-gray-200 text-black")
                                            }
                                            onClick={() =>
                                                handleYourTraitsChange(trait)
                                            }
                                        >
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </span>
                )}
                {selectedTab === 1 && (
                    <span className="p-1 flex flex-col items-start mt-4">
                        <div className="flex gap-4 items-start mb-4 justify-items-center ">
                            <div>
                                <span className="text-sm font-bold mb-1 pl-1 mr-2">
                                    Age:
                                </span>
                                <input
                                    className="rounded-2xl px-3 py-2 w-[100px] bg-white/20 h-[36px]"
                                    type="number"
                                    value={wantedAge}
                                    onChange={handleOnWantedAgeChange}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold">
                                    Gender:{" "}
                                </span>
                                <select
                                    defaultValue={wantedGender}
                                    className="py-2 px-3 rounded-2xl bg-white/20 appearance-none "
                                    onChange={handleOnWantedGenderChange}
                                >
                                    {genders.map((g) => (
                                        <option key={g} value={g}>
                                            {g}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {Object.keys(categories).map((category) => (
                            <div
                                key={category}
                                className="flex flex-col items-start pb-4"
                            >
                                <span className="p-1 mb-1 text-sm font-bold">
                                    {toTitleCase(category)}
                                </span>
                                <div className="flex gap-2">
                                    {categories[category].map((trait) => (
                                        <span
                                            key={trait}
                                            className={
                                                "px-3 py-2 border border-white/30 rounded-[16px] cursor-pointer " +
                                                (wantedTraits.includes(trait) &&
                                                    "bg-gray-200 text-black")
                                            }
                                            onClick={() =>
                                                handleWantedTraitsChange(trait)
                                            }
                                        >
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </span>
                )}
            </div>
            <button className="shadow mx-auto w-[250px]" onClick={handleSubmit}>
                {loading
                    ? "Submitting.."
                    : wantedTraits.length !== 0 && wantedTraits.length !== 0
                    ? "Submit"
                    : "Next"}
            </button>
        </div>
    );
};
