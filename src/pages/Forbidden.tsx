import { ErrorPage } from '@/components/shared/feedback';
export default function Forbidden() {
  return (
    <ErrorPage
      code="403"
      title="Access denied"
      description="Your current demo role cannot access this page."
    />
  );
}
