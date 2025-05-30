
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductVotingProps {
  productId: string;
  productName: string;
}

const ProductVoting = ({ productId, productName }: ProductVotingProps) => {
  const { toast } = useToast();
  const [votes, setVotes] = useState({ up: 42, down: 8 });
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      // Remove vote
      setVotes(prev => ({
        ...prev,
        [voteType]: prev[voteType] - 1
      }));
      setUserVote(null);
      toast({
        title: "Vote removed",
        description: "Your vote has been removed.",
      });
    } else {
      // Add new vote or change existing vote
      setVotes(prev => {
        const newVotes = { ...prev };
        if (userVote) {
          // Remove previous vote
          newVotes[userVote] = newVotes[userVote] - 1;
        }
        // Add new vote
        newVotes[voteType] = newVotes[voteType] + 1;
        return newVotes;
      });
      setUserVote(voteType);
      
      toast({
        title: voteType === 'up' ? "Voted up!" : "Voted down!",
        description: `Thanks for voting on ${productName}!`,
      });
    }
  };

  const votePercentage = votes.up + votes.down > 0 
    ? Math.round((votes.up / (votes.up + votes.down)) * 100) 
    : 0;

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-emerald-50/50">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-emerald-600" />
        <h3 className="font-medium text-emerald-900">Vote on this design</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant={userVote === 'up' ? "default" : "outline"}
            size="sm"
            onClick={() => handleVote('up')}
            className={userVote === 'up' ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            {votes.up}
          </Button>
          
          <Button
            variant={userVote === 'down' ? "destructive" : "outline"}
            size="sm"
            onClick={() => handleVote('down')}
            className={userVote !== 'down' ? "border-gray-200 text-gray-600 hover:bg-gray-50" : ""}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            {votes.down}
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-emerald-600">{votePercentage}%</span> approval
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${votePercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProductVoting;
