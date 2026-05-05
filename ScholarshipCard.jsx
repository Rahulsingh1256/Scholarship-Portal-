import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Bookmark, BookmarkCheck, Tag, Building2, Clock } from 'lucide-react';

const categoryBadge = {
  merit:         'badge-merit',
  'need-based':  'badge-need',
  minority:      'badge-minority',
  research:      'badge-research',
  sports:        'badge-sports',
  international: 'badge-international',
  other:         'badge badge-review',
};

const categoryLabel = {
  merit: 'Merit', 'need-based': 'Need Based', minority: 'Minority',
  research: 'Research', sports: 'Sports', international: 'International', other: 'Other',
};

export default function ScholarshipCard({ scholarship, isBookmarked, onToggleBookmark, showApply = true }) {
  const deadline = new Date(scholarship.deadline);
  const isExpired = deadline < new Date();
  const daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="glass-card p-6 flex flex-col gap-4 hover:border-primary-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5 animate-slide-up group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`badge ${categoryBadge[scholarship.category] || 'badge-review'}`}>
              <Tag size={10} />
              {categoryLabel[scholarship.category] || 'Other'}
            </span>
            {isExpired && (
              <span className="badge bg-red-500/10 text-red-400 border border-red-500/20">Expired</span>
            )}
          </div>
          <Link to={`/scholarships/${scholarship._id}`} className="group-hover:text-primary-300 transition-colors">
            <h3 className="font-display font-semibold text-white text-base leading-snug line-clamp-2 hover:text-primary-300 cursor-pointer transition-colors">
              {scholarship.title}
            </h3>
          </Link>
        </div>
        {onToggleBookmark && (
          <button
            onClick={() => onToggleBookmark(scholarship._id)}
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: isBookmarked ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)' }}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            {isBookmarked
              ? <BookmarkCheck size={17} className="text-primary-400" />
              : <Bookmark size={17} className="text-slate-500 hover:text-slate-300" />
            }
          </button>
        )}
      </div>

      {/* Provider */}
      <div className="flex items-center gap-2 text-slate-400 text-xs">
        <Building2 size={13} className="text-slate-500 flex-shrink-0" />
        <span className="truncate">{scholarship.provider}</span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{scholarship.description}</p>

      {/* Amount */}
      {scholarship.amount && (
        <div className="text-emerald-400 font-semibold text-sm">💰 {scholarship.amount}</div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
        <div className={`flex items-center gap-1.5 text-xs font-medium ${isExpired ? 'text-red-400' : daysLeft <= 15 ? 'text-amber-400' : 'text-slate-400'}`}>
          <Clock size={13} />
          {isExpired ? 'Deadline passed' : `${daysLeft} days left`}
          <span className="text-slate-600 ml-1">· {deadline.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/scholarships/${scholarship._id}`}
            className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
