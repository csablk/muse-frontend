import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[180px] max-w-[300px] p-2 rounded cursor-pointer hover:bg-white/10 flex flex-col"
    >
      <img loading="lazy" src={image} alt="image" className="rounded w-full" />
      <p className="font-bold mt-2 mb-2 text-1xl truncate">{name}</p>
      <p className="text-slate-200 text-sm break-words">{desc}</p>
    </div>
  );
};

export default AlbumItem;
