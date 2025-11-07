import { Suspense } from 'react';
import { Part } from '@prisma/client';
import {
  CustomResizablePanel,
  ResizableHandle,
  ResizablePanelGroup
} from '../../ui/resizable';
import ButtonNavigatePart from './button-nav-part';
import { PassageRender } from './passage-render';
import QuestionGroupRender from './question-group-render';

const PartRender = async ({
  part,
  totalParts
}: {
  part: Part;
  totalParts: number;
}) => {
  const hasOrder = typeof (part as any)?.order === 'number';
  const order: number = hasOrder ? (part as any).order : 0;
  const nextPartIndex =
    hasOrder && typeof totalParts === 'number' && order < totalParts - 1
      ? order + 1
      : undefined;
  const prevPartIndex = hasOrder && order > 0 ? order - 1 : undefined;
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg flex-grow"
    >
      <CustomResizablePanel>
        <div className=" mb-20">
          <p>{part?.title ?? ''}</p>
          {part?.id && (
            <Suspense fallback={<></>}>
              <QuestionGroupRender partId={part.id} />
            </Suspense>
          )}
        </div>
        <div className="absolute bottom-0 left-0 bg-background w-full py-2 px-4">
          <div className="flex items-center justify-between">
            <p>{part?.title ?? ''}</p>
            <ButtonNavigatePart
              prevPartIndex={prevPartIndex}
              nextPartIndex={nextPartIndex}
            />
          </div>
        </div>
      </CustomResizablePanel>

      <ResizableHandle withHandle />
      <CustomResizablePanel>
        {part?.id && (
          <Suspense fallback={<></>}>
            <PassageRender partId={part.id} />
          </Suspense>
        )}
      </CustomResizablePanel>
    </ResizablePanelGroup>
  );
};

export default PartRender;
