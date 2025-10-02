'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import BasicInput from '@/components/commons/BasicInput';

interface FormValues {
	company: string;
}

interface ProfileCompanyInputProps {
	register: UseFormRegister<FormValues>;
	errors: FieldErrors<FormValues>;
	value: string;
}

export default function ProfileCompanyInput({ register, errors, value }: ProfileCompanyInputProps) {
	return (
		<BasicInput
			placeholder="회사명"
			register={register('company', {
				required: '회사명을 입력하세요'
			})}
			required
			isValid={!errors.company}
			invalidText="회사명을 입력해주세요"
			value={value}
		/>
	);
}
