import { ChangeEventHandler, useState } from "react";
import { toTitleCase } from "../lib/utils";

export const TraitSelector = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [yourTraits, setYourTraits] = useState<string[]>([]);
    const [wantedTraits, setWantedTraits] = useState<string[]>([]);
    const [yourAge, setYourAge] = useState(21);
    const [wantedAge, setWantedAge] = useState(21);
    const [yourGender, setYourGender] = useState(0);
    const [wantedGender, setWantedGender] = useState(0);

    const categories: Record<string, string[]> = {
        creativity: ["art", "photography", "dance", "music"],
        sports: ["basketball", "football", "cricket", "chess", "carroms"],
        personality: ["weeb", "gamer", "foodie", "traveler"],
    };

    const genders = ["Male", "Female", "Other"];

    const handleSubmit = () => {
        if (wantedTraits.length === 0) {
            return setSelectedTab(1);
        } else if (yourTraits.length === 0) {
            return setSelectedTab(0);
        }
    };

    const handleTabChange = (tab: number) => {
        setSelectedTab(tab);
    };
    const handleYourTraitsChange = (trait: string) => {
        setYourTraits([...yourTraits, trait]);
    };
    const handleWantedTraitsChange = (trait: string) => {
        setWantedTraits([...wantedTraits, trait]);
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
        setYourGender(Number(e.target.value));
    };

    const handleOnWantedGenderChange: ChangeEventHandler<HTMLSelectElement> = (
        e
    ) => {
        setWantedGender(Number(e.target.value));
    };

    return (
        <div className="flex flex-col p-6">
            <h1 className="mb-8">Trait Selector</h1>
            <div className="flex flex-col items-start">
                <div className="flex gap-5 w-max place-content-center  rounded-3xl bg-gray-500 ">
                    <span
                        className={`${
                            selectedTab === 0 &&
                            "font-bold text-white bg-blue-500 pl-8 pr-8"
                        } py-3  rounded-3xl cursor-pointer text-2xl pl-8`}
                        onClick={() => handleTabChange(0)}
                    >
                        What you are
                    </span>
                    <span
                        className={`${
                            selectedTab === 1 &&
                            "font-bold text-white bg-blue-500 pl-8 pr-8"
                        } py-3  rounded-3xl cursor-pointer text-2xl pr-8`}
                        onClick={() => handleTabChange(1)}
                    >
                        What you want
                    </span>
                </div>
                {selectedTab === 0 && (
                    <span className="p-1 flex flex-col items-start mt-4">
                        <div className="flex gap-4 items-start mb-4 justify-items-center ">
                            <div>
                                <span className="text-sm font-bold mb-1 pl-1 mr-2">
                                    Age:
                                </span>
                                <input
                                    className="rounded-2xl px-3 py-2 w-[100px] h-[36px]"
                                    type="number"
                                    value={yourAge}
                                    onChange={handleOnAgeChange}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold">
                                    Gender:{" "}
                                </span>
                                <select
                                    className="py-2 px-3 rounded-2xl appearance-none "
                                    onChange={handleOnGenderChange}
                                >
                                    {genders.map((g) => (
                                        <option key={g} value={yourGender}>
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
                                                "px-3 py-2 border border-gray-400 rounded-[16px] cursor-pointer " +
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
                                    className="rounded-2xl px-3 py-2 w-[100px] h-[36px]"
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
                                    className="py-2 px-3 rounded-2xl appearance-none "
                                    onChange={handleOnWantedGenderChange}
                                >
                                    {genders.map((g) => (
                                        <option key={g} value={wantedGender}>
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
                                                "px-3 py-2 border border-gray-400 rounded-[16px] cursor-pointer " +
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
            <button className="w-max mx-auto" onClick={handleSubmit}>
                {wantedTraits.length !== 0 && wantedTraits.length !== 0
                    ? "Submit"
                    : "Next"}
            </button>
        </div>
    );
};
