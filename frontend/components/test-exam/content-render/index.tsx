'use client';

import { useContext } from 'react';
import { Send } from 'lucide-react';
import { ExamContext } from '@/global/exam-context';
import { useExamHandler } from '@/global/use-exam-handler';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ActionButton } from '../action-button';
import ButtonNavigationQuestion from '../button-nav-question';
import { TestProgress } from '../test-progress';
import PartBodyContentRender from './body';
import FooterContentRender from './footer';

export const TestExamContentRender = () => {
  const { selectedAssessment, activeTab, mode } = useContext(ExamContext);
  const { handleSubmit } = useExamHandler();
  if (!selectedAssessment) {
    return null;
  }

  return (
    <>
      {mode === 'exam' && <TestProgress />}
      <Tabs value={activeTab} className="overflow-hidden flex-1 flex flex-col">
        {selectedAssessment.parts.map((part: { id: string; title: string; description: string }) => (
          <TabsContent
            key={part.id}
            value={part.id}
            className="overflow-hidden flex flex-col"
          >
            <div className="p-4">
              <div className="px-4 py-2 border-foreground rounded-md border items-center">
                <div className="flex gap-2 justify-between items-center">
                  <div>
                    <p className="font-bold">{part.title}</p>
                    <p>{part.description}</p>
                  </div>
                  {mode === 'edit' && (
                    <ActionButton
                      editType="editPart"
                      actionType="update"
                      data={{ part }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-y-auto">
              <PartBodyContentRender />
            </div>
            <ButtonNavigationQuestion />
          </TabsContent>
        ))}
        {mode === 'exam' && (
          <TabsContent value="delivering" className="h-full flex flex-col justify-end">
            <div className="p-4">
              <div className="flex justify-between items-center w-full max-w-3xl mx-auto">
                <p className="text-muted-foreground">Review your answers before submitting</p>
                <Button size="lg" onClick={handleSubmit}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Test
                </Button>
              </div>
            </div>
          </TabsContent>
        )}
        <FooterContentRender />
      </Tabs>
    </>
  );
};
