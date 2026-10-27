import { useNavigate } from 'react-router-dom';
import { RecordForm, type RecordValues } from './RecordForm';
import { useSaveRecord } from './data';
import { useToast } from '@/components/ui';
export default function CreatePage(){const save=useSaveRecord();const navigate=useNavigate();const toast=useToast();async function submit(values:RecordValues){try{await save.mutateAsync({...values,id:crypto.randomUUID(),updatedAt:new Date().toISOString().slice(0,10)});toast('Mock record created');navigate('/records')}catch(error){toast(error instanceof Error?error.message:'Unable to save')}}return <div className="page max-w-2xl"><div><h1>Create record</h1><p className="muted">A full-page form pattern with schema validation.</p></div><section className="card"><RecordForm onSave={submit} pending={save.isPending}/></section></div>}
