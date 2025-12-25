import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Check, Clock } from 'lucide-react';
import { NeumorphicButton } from './NeumorphicButton';
import { format } from 'date-fns';
import type { TaskResponse } from '@shared/routes';
import { clsx } from 'clsx';

interface TaskCardProps {
  task: TaskResponse;
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete }) => {
  const priorityColors = {
    high: "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.4)]",
    medium: "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.4)]",
    low: "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.4)]"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={clsx(
        "group relative flex items-center justify-between p-5 rounded-3xl mb-4 transition-all duration-300",
        task.completed 
          ? "bg-[#e0e5ec] shadow-none opacity-60" 
          : "bg-[#e0e5ec] shadow-neumorphic hover:shadow-neumorphic-hover"
      )}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => onToggle(task.id, task.completed)}
          className={clsx(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 outline-none",
            task.completed
              ? "bg-[#667eea] shadow-neumorphic-inset text-white"
              : "bg-[#e0e5ec] shadow-neumorphic hover:shadow-neumorphic-inset text-transparent hover:text-gray-300"
          )}
        >
          <Check size={16} strokeWidth={3} />
        </button>

        <div className="flex flex-col gap-1 min-w-0">
          <h3 className={clsx(
            "font-bold text-lg leading-tight truncate transition-colors",
            task.completed ? "text-gray-400 line-through decoration-2 decoration-gray-300" : "text-gray-700"
          )}>
            {task.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
            <span className={clsx("w-2 h-2 rounded-full", priorityColors[task.priority as keyof typeof priorityColors])} />
            <span className="capitalize">{task.priority} Priority</span>
            {task.createdAt && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {format(new Date(task.createdAt), 'MMM d')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4">
        <NeumorphicButton 
          variant="icon" 
          onClick={() => onDelete(task.id)}
          className="text-red-400 hover:text-red-500 w-10 h-10 p-0"
        >
          <Trash2 size={18} />
        </NeumorphicButton>
      </div>
    </motion.div>
  );
};
