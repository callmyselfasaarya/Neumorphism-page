import React, { useState } from 'react';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '@/hooks/use-tasks';
import { NeumorphicCard } from '@/components/NeumorphicCard';
import { NeumorphicButton } from '@/components/NeumorphicButton';
import { NeumorphicInput } from '@/components/NeumorphicInput';
import { TaskCard } from '@/components/TaskCard';
import { Plus, ListFilter, Activity, LayoutGrid } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { useToast } from '@/hooks/use-toast';

type FilterType = 'all' | 'active' | 'completed';

export default function Home() {
  const { data: tasks, isLoading } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const { toast } = useToast();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<FilterType>('all');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      await createTask.mutateAsync({ 
        title: newTaskTitle, 
        priority, 
        completed: false 
      });
      setNewTaskTitle('');
      setPriority('medium');
      toast({ title: "Task added", description: "Keep up the momentum!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add task", variant: "destructive" });
    }
  };

  const handleToggle = (id: number, currentStatus: boolean) => {
    updateTask.mutate({ id, completed: !currentStatus });
  };

  const handleDelete = (id: number) => {
    deleteTask.mutate(id);
    toast({ title: "Deleted", description: "Task removed successfully" });
  };

  const filteredTasks = tasks?.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }) ?? [];

  const completionPercentage = tasks && tasks.length > 0
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
    : 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#e0e5ec]">
      <div className="w-full max-w-xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-700 tracking-tight">My Tasks</h1>
            <p className="text-gray-500 font-semibold mt-1">
              {format(new Date(), 'EEEE, MMMM do')}
            </p>
          </div>
          <NeumorphicCard className="w-16 h-16 rounded-full flex items-center justify-center !p-0">
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 p-1">
                <circle
                  className="text-gray-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="24"
                  cx="28"
                  cy="28"
                />
                <circle
                  className="text-[#667eea]"
                  strokeWidth="4"
                  strokeDasharray={150}
                  strokeDashoffset={150 - (150 * completionPercentage) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="24"
                  cx="28"
                  cy="28"
                />
              </svg>
              <span className="absolute text-xs font-bold text-gray-600">{completionPercentage}%</span>
            </div>
          </NeumorphicCard>
        </div>

        {/* Create Task Input */}
        <NeumorphicCard className="relative overflow-hidden">
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <NeumorphicInput
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1"
                disabled={createTask.isPending}
              />
              <NeumorphicButton 
                type="submit" 
                disabled={createTask.isPending || !newTaskTitle.trim()}
                className="w-14 h-14 !rounded-full !p-0 flex-shrink-0 bg-[#667eea] text-white hover:text-white"
              >
                <Plus size={24} strokeWidth={3} />
              </NeumorphicButton>
            </div>
            
            <div className="flex gap-4 px-2">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={clsx(
                    "text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 uppercase tracking-wider",
                    priority === p 
                      ? "bg-[#e0e5ec] shadow-neumorphic-inset text-[#667eea]" 
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </form>
        </NeumorphicCard>

        {/* Filters */}
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-4 bg-[#e0e5ec] p-2 rounded-2xl shadow-neumorphic-inset">
            {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300",
                  filter === f
                    ? "bg-[#e0e5ec] shadow-neumorphic text-[#667eea]"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="text-sm font-bold text-gray-400">
            {filteredTasks.length} Tasks
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4 pb-20">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-3xl bg-[#e0e5ec] shadow-neumorphic animate-pulse" />
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#e0e5ec] shadow-neumorphic flex items-center justify-center text-gray-300">
                <LayoutGrid size={40} />
              </div>
              <p className="text-gray-400 font-semibold">No tasks found</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
