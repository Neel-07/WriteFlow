"use client"
import React, { useActionState, useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { createFlow } from '@/actions/flow.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type props = {}

const CreateFlowForm = (props: props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [state, createFlowAction, isPending] = useActionState(createFlow, null)

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false)
      router.push(`/blog/draft/${state?.id}`)
      toast.success('Flow created successfully')
    }
    if (state?.error) {
      setIsOpen(false)
      toast.error('Failed to create flow')
    }
  }, [isPending, state?.success, state?.error, state?.id, router])

  return (
    <div id='createFlowForm'>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {/* //TODO: Baad me isko dekhna h */}
          <button
            onClick={() => setIsOpen(true)}
            className="transition-all w-full text-sm ease-in hover:bg-[#f5f5f5] dark:hover:bg-white/20 flex items-center gap-3 px-4 py-[5px] rounded-md hover:shadow-lg"
          >
            <div className="flex gap-2 justify-center">
              <div className="size-[35px] overflow-hidden">
                Icon Here
              </div>
              <p className="w-[100%]">Create Flow</p>
            </div>
          </button>
          {/* </LinkButton> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write Your Flow</DialogTitle>
          </DialogHeader>
          <form action={createFlowAction}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name='title'
                  placeholder="Enter title"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className='disabled:cursor-wait opacity-90 ' disabled={isPending} >
                {
                  isPending ? "Creating..." : "Create Flow"
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateFlowForm
