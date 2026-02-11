import { Pencil, Trash2, Calendar, Flag } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-dark-100 text-dark-800 border-dark-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-dark-100 text-dark-800 border-dark-200';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 animate-slide-up">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-dark-900 flex-1">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-primary-50 rounded-lg transition-colors text-primary-600"
            title="Edit task"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-dark-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`badge border ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ')}
        </span>
        <span className={`badge border ${getPriorityColor(task.priority)} flex items-center`}>
          <Flag className="h-3 w-3 mr-1" />
          {task.priority}
        </span>
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="badge bg-primary-100 text-primary-700 border border-primary-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {task.dueDate && (
        <div className="flex items-center text-sm text-dark-500 pt-3 border-t border-dark-100">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;