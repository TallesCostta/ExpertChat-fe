import React from 'react';
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';

interface RegisterFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RegisterFields({ formData, onChange }: RegisterFieldsProps) {
  const handleDateChange = (e: any) => {
    onChange({
      target: {
        name: 'birthDate',
        value: e.value ? e.value.toISOString() : '',
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...e,
      target: {
        ...e.target,
        name: 'phone',
        value: e.target.value,
      },
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Nome completo"
        />
      </div>

      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="E-mail"
        />
      </div>

      <div>
        <InputMask
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          mask="(99) 99999-9999"
          placeholder="(99) 99999-9999"
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>

      <div>
        <Calendar
          id="birthDate"
          name="birthDate"
          value={formData.birthDate ? new Date(formData.birthDate) : null}
          onChange={handleDateChange}
          dateFormat="dd/mm/yy"
          showIcon
          icon="pi pi-calendar text-blue-600 text-xl"
          locale="pt-BR"
          placeholder="Data de nascimento"
          className="w-full"
          maxDate={new Date()}
          required
          touchUI
          inputClassName="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </>
  );
}