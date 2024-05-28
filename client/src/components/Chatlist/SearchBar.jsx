import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useState } from "react";
import { BiFilter, BiSearchAlt2, BiArrowBack } from "react-icons/bi";

export default function SearchBar() {
  const [{ contactSearch }, dispatch] = useStateProvider();
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  }
  return (
    <>
    <div className="bg-search-input-container-background flex py-3 pl-5 items-center gap-3 h-14">
      <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <div>
          <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent text-sm focus:outline-none text-white w-full"
            value={contactSearch}
            onChange={(e) =>
              dispatch({
                type: reducerCases.SET_CONTACT_SEARCH,
                contactSearch: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BiFilter className="text-panel-header-icon cursor-pointer text-xl " onClick={handleShowFilter} />
      </div>
    </div>
        {
          showFilter && (
            <div className="flex bg-search-input-container-background items-center gap-2 pb-4 justify-start px-4 caret-transparent">
              <div className="px-4 py-1 rounded-md text-white bg-slate-700 cursor-pointer hover:bg-green-300 hover:text-gray-700">All</div>
              <div className="px-4 py-1 rounded-md text-white bg-slate-700 cursor-pointer hover:bg-green-300 hover:text-gray-700">Unread</div>
              <div className="px-4 py-1 rounded-md text-white bg-slate-700 cursor-pointer hover:bg-green-300 hover:text-gray-700">Group</div>
            </div>
          )
        }
      </>
  );
}
