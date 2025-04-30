import React from "react";

interface TimelineProps {
  currentStatus: string;
}

// Lista de estados del pedido en orden
const statuses: string[] = ["Recibido", "En Proceso", "Enviado", "Entregado"];

/**
 * Componente para visualizar el progreso del pedido.
 * Resalta el estado actual y los anteriores.
 */
const Timeline: React.FC<TimelineProps> = ({ currentStatus }) => {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="flex justify-between items-center">
      {statuses.map((status, index) => (
        <div key={status} className="flex-1 text-center">
          <div
            className={`w-8 h-8 mx-auto rounded-full ${
              index <= currentIndex ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <p className="text-sm mt-2">{status}</p>
          {index < statuses.length - 1 && (
            <div
              className={`h-1 mx-auto my-2 ${
                index < currentIndex ? "bg-green-500" : "bg-gray-300"
              }`}
              style={{ width: "80%" }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
