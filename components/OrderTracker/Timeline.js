import React from 'react';

// Definición de los posibles estados del pedido.
const statuses = ['Recibido', 'En Proceso', 'Enviado', 'Entregado'];

/**
 * Componente para visualizar el progreso del pedido en forma de línea.
 * Resalta el estado actual y los anteriores.
 * @param {string} currentStatus - Estado actual del pedido.
 */
const Timeline = ({ currentStatus }) => {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="flex justify-between items-center">
      {statuses.map((status, index) => (
        <div key={status} className="flex-1 text-center">
          {/* Indicador del estado: se resalta si ya se alcanzó el estado actual */}
          <div
            className={`w-8 h-8 mx-auto rounded-full ${
              index <= currentIndex ? 'bg-green-500' : 'bg-gray-300'
            }`}
          ></div>
          <p className="text-sm mt-2">{status}</p>
          {/* Línea que conecta los estados */}
          {index < statuses.length - 1 && (
            <div
              className={`h-1 mx-auto my-2 ${
                index < currentIndex ? 'bg-green-500' : 'bg-gray-300'
              }`}
              style={{ width: '80%' }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
