import { IConference } from '@/types/conference';
import Conference from '@/components/molecules/Conference/Conference';
import useAuth from '@/hooks/api/useAuth';
import { useGetConferences } from '@/hooks/api/useConference';
import { Suspense } from 'react';

function Conferences() {
  const { user } = useAuth();
  const { conferences } = useGetConferences(user);

  return (
    <>
      <Suspense fallback={<div>loadign</div>}>
        {conferences?.map((conference) => (
          <Conference key={conference.id} conference={conference} />
        ))}
      </Suspense>
    </>
  );
}

export default Conferences;
