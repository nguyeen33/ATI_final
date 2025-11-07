import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-[300px] mb-6" />
        
        <div className="space-y-8">
          {[1, 2, 3].map((section) => (
            <div key={section} className="bg-white rounded-lg shadow p-6">
              <Skeleton className="h-8 w-[200px] mb-4" />
              <Skeleton className="h-20 w-full mb-6" />
              
              <div className="space-y-6">
                {[1, 2, 3].map((question) => (
                  <div key={question} className="border-t pt-4">
                    <Skeleton className="h-6 w-full mb-3" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((option) => (
                        <Skeleton key={option} className="h-8 w-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>
    </div>
  )
}