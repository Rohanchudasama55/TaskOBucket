import { MoreHorizontal } from "lucide-react";

interface CommonCardProps {
  image: string;
  badge?: string;
  title: string;
  keyLabel: string;
  openCount: number;
  doneCount: number;
  updatedAt: string;
  onMoreClick?: () => void;
}

export default function CommonCard({
  image,
  badge = "MOBILE APP",
  title,
  keyLabel,
  openCount,
  doneCount,
  updatedAt,
  onMoreClick,
}: CommonCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
      {/* Image Section */}
      <div className="relative h-36 overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 bottom-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
          {badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title Row */}
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <MoreHorizontal 
            className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" 
            onClick={onMoreClick}
          />
        </div>

        {/* Key */}
        <p className="text-sm text-gray-500">
          Key: <span className="px-2 text-gray-400 rounded-md bg-black/10">{keyLabel}</span>
        </p>

        {/* Status */}
        <div className="flex border-b border-gray-400 items-center gap-4 pb-3 text-sm">
          <span className="flex items-center gap-1 text-gray-600">🔵 {openCount} Open</span>
          <span className="flex items-center gap-1 text-green-600">✅ {doneCount} Done</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
          <span>Updated {updatedAt}</span>
          <div className="flex -space-x-2">
            <img
              className="h-6 w-6 rounded-full border border-white"
              src="https://i.pravatar.cc/100?img=1"
              alt="User 1"
            />
            <img
              className="h-6 w-6 rounded-full border border-white"
              src="https://i.pravatar.cc/100?img=2"
              alt="User 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}