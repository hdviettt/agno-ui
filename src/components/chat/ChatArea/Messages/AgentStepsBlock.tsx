import { useState } from 'react'
import { ChevronDown, ChevronRight, Check, Loader2 } from 'lucide-react'
import type { ToolCall } from '@/types/os'

interface AgentStepsBlockProps {
  toolCalls: ToolCall[]
}

const AgentStepsBlock = ({ toolCalls }: AgentStepsBlockProps) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set())

  const toggleStep = (index: number) => {
    const newExpanded = new Set(expandedSteps)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedSteps(newExpanded)
  }

  if (!toolCalls || toolCalls.length === 0) {
    return null
  }

  return (
    <div className="flex w-full flex-col gap-2 my-4">
      {toolCalls.map((tool, index) => {
        const isExpanded = expandedSteps.has(index)
        const hasError = tool.tool_call_error
        const isCompleted = !hasError && tool.content !== null

        return (
          <div
            key={tool.tool_call_id}
            className={`
              border rounded-lg overflow-hidden transition-all
              ${hasError ? 'border-red-300 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20' : ''}
              ${isCompleted ? 'border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20' : ''}
              ${!hasError && !isCompleted ? 'border-blue-300 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20' : ''}
            `}
          >
            <button
              onClick={() => toggleStep(index)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : hasError ? (
                    <div className="w-4 h-4 text-red-600 dark:text-red-400 font-bold">!</div>
                  ) : (
                    <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
                  )}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="font-medium text-sm">
                    {tool.tool_name || 'Agent Call'}
                  </span>
                  {tool.metrics?.time && (
                    <span className="text-xs text-muted-foreground">
                      {(tool.metrics.time / 1000).toFixed(2)}s
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t">
                {tool.tool_args && Object.keys(tool.tool_args).length > 0 && (
                  <div className="pt-3">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">
                      Input:
                    </div>
                    <div className="bg-background/50 rounded p-3 text-xs font-mono overflow-x-auto">
                      <pre>{JSON.stringify(tool.tool_args, null, 2)}</pre>
                    </div>
                  </div>
                )}

                {tool.content && (
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-2">
                      Output:
                    </div>
                    <div className="bg-background/50 rounded p-3 text-sm">
                      {tool.content}
                    </div>
                  </div>
                )}

                {hasError && (
                  <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                    This step encountered an error
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default AgentStepsBlock
