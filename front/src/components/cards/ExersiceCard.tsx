import {SportShoeIcon, WavesHorizontalIcon, BikeIcon} from "lucide-react";
import { useRouter } from "next/navigation";

type ExerciseCardProps = {
    exercice: any;
    onDelete: (id:number)=>void;
}

export default function ExerciseCard({ exercice, onDelete}: ExerciseCardProps) {
    const router = useRouter();

    return(
        <div className="w-24 h-24 rounded-full">
            
        </div>
    )
}

