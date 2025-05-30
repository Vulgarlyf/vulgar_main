
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  user: string;
  comment: string;
  timestamp: string;
  rating?: number;
}

interface ProductCommentsProps {
  productId: string;
  productName: string;
}

const ProductComments = ({ productId, productName }: ProductCommentsProps) => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "Alex K.",
      comment: "Love this design! The quality is amazing and the fit is perfect.",
      timestamp: "2 days ago",
      rating: 5
    },
    {
      id: "2", 
      user: "Jordan M.",
      comment: "Bold choice for a t-shirt. Really makes a statement!",
      timestamp: "1 week ago",
      rating: 4
    }
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      user: "You",
      comment: newComment.trim(),
      timestamp: "Just now",
      rating: rating
    };

    setComments(prev => [comment, ...prev]);
    setNewComment("");
    setRating(5);

    toast({
      title: "Comment added!",
      description: "Thanks for sharing your thoughts!",
    });
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xs ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-emerald-600" />
        <h3 className="font-medium">Comments ({comments.length})</h3>
      </div>

      {/* Add Comment Form */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Comment</label>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={`Share your thoughts about ${productName}...`}
            className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows={3}
          />
        </div>
        
        <Button
          onClick={handleSubmitComment}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          size="sm"
        >
          <Send className="h-4 w-4 mr-2" />
          Post Comment
        </Button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-emerald-600" />
              </div>
              
              <div className="flex-grow space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.user}</span>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  {renderStars(comment.rating)}
                </div>
                <p className="text-sm text-gray-700">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComments;
