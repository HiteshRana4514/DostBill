import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
    title: string;
    excerpt: string;
    image?: string;
    category: string;
    date: string;
    readTime: string;
    onClick?: () => void;
}

export default function BlogCard({
    title,
    excerpt,
    image,
    category,
    date,
    readTime,
    onClick
}: BlogCardProps) {
    return (
        <article 
            className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 group h-full flex flex-col cursor-pointer"
            onClick={onClick}
        >
            {/* Image or Icon Placeholder */}
            <div className="relative h-48 overflow-hidden">
                {image ? (
                    // Show cover image if available
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    // Show icon placeholder if no image
                    <div className="relative h-full bg-linear-to-br from-orange-100 to-orange-50">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center">
                                <span className="text-2xl">📝</span>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{readTime}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-muted mb-4 line-clamp-3 flex-1">
                    {excerpt}
                </p>

                {/* Admin & Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-xs font-semibold text-brand-primary">
                            A
                        </div>
                        <span className="text-sm font-medium text-text-main">
                            By Admin
                        </span>
                    </div>
                    <button className="text-brand-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </article>
    );
}
