import React from 'react';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';

interface FooterProps {
  handleUpdate: () => void;
  handleSubmit: () => void;
}

const Footer = (props: FooterProps) => {
  const { handleUpdate, handleSubmit } = props;

  const router = useRouter();
  const path = usePathname();

  return (
    <div className="fixed bottom-0 z-50 flex h-14 w-full items-center justify-end gap-2 border-t bg-white p-10">
      <Button variant="outline" onClick={() => router.back()}>
        Back
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          path.includes('write') ? handleSubmit() : handleUpdate()
        }
      >
        Publish
      </Button>
    </div>
  );
};

export default Footer;
