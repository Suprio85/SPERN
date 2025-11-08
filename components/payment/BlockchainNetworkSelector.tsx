'use client'

import { Card } from '@/components/ui/card'
import { Building2, Check, Shield, Zap } from 'lucide-react'
import React, { useState } from 'react'

export type BlockchainNetwork = 'hyperledger' | 'polygon' | 'ethereum'

interface NetworkOption {
  id: BlockchainNetwork
  name: string
  description: string
  icon: React.ReactNode
  features: string[]
  recommended?: boolean
}

interface BlockchainNetworkSelectorProps {
  selectedNetwork?: BlockchainNetwork
  onNetworkChange?: (network: BlockchainNetwork) => void
  showRecommendation?: boolean
}

const networks: NetworkOption[] = [
  {
    id: 'hyperledger',
    name: 'Hyperledger Fabric',
    description: 'Enterprise-grade permissioned blockchain',
    icon: <Building2 className="w-6 h-6" />,
    features: ['Private transactions', 'High throughput', 'Compliance ready'],
    recommended: true
  },
  {
    id: 'polygon',
    name: 'Polygon',
    description: 'Fast & affordable Ethereum L2',
    icon: <Zap className="w-6 h-6" />,
    features: ['Sub-second finality', 'Low gas fees', 'EVM compatible']
  },
  {
    id: 'ethereum',
    name: 'Ethereum Mainnet',
    description: 'Most secure & decentralized',
    icon: <Shield className="w-6 h-6" />,
    features: ['Maximum security', 'Global network', 'Full decentralization']
  }
]

export default function BlockchainNetworkSelector({
  selectedNetwork = 'hyperledger',
  onNetworkChange,
  showRecommendation = true
}: BlockchainNetworkSelectorProps) {
  const [selected, setSelected] = useState<BlockchainNetwork>(selectedNetwork)

  const handleSelect = (network: BlockchainNetwork) => {
    setSelected(network)
    onNetworkChange?.(network)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
            Blockchain Settlement Network
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Choose network for transaction settlement
          </p>
        </div>
      </div>

      {/* Network Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {networks.map((network) => {
          const isSelected = selected === network.id
          
          return (
            <button
              key={network.id}
              onClick={() => handleSelect(network.id)}
              className={`
                relative text-left transition-all duration-200 group
                ${isSelected 
                  ? 'scale-105 shadow-lg' 
                  : 'hover:scale-102 hover:shadow-md'
                }
              `}
            >
              <Card className={`
                p-4 h-full border-2 transition-all
                ${isSelected 
                  ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-700'
                }
              `}>
                {/* Recommended Badge */}
                {showRecommendation && network.recommended && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    Recommended
                  </div>
                )}

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all
                  ${isSelected 
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                  }
                `}>
                  {network.icon}
                </div>

                {/* Content */}
                <div>
                  <h4 className={`
                    font-semibold mb-1 transition-colors
                    ${isSelected 
                      ? 'text-purple-900 dark:text-purple-100' 
                      : 'text-slate-900 dark:text-white'
                    }
                  `}>
                    {network.name}
                  </h4>
                  <p className={`
                    text-xs mb-3 transition-colors
                    ${isSelected 
                      ? 'text-purple-700 dark:text-purple-300' 
                      : 'text-slate-600 dark:text-slate-400'
                    }
                  `}>
                    {network.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1.5">
                    {network.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className={`
                          w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0
                          ${isSelected 
                            ? 'bg-purple-600' 
                            : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-purple-600'
                          }
                        `}>
                          <Check className={`
                            w-2.5 h-2.5 transition-colors
                            ${isSelected 
                              ? 'text-white' 
                              : 'text-white'
                            }
                          `} />
                        </div>
                        <span className={`
                          text-xs transition-colors
                          ${isSelected 
                            ? 'text-purple-800 dark:text-purple-200' 
                            : 'text-slate-600 dark:text-slate-400'
                          }
                        `}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </button>
          )
        })}
      </div>

      {/* Info Footer */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div className="text-xs text-blue-700 dark:text-blue-300">
            <p className="font-semibold mb-1">Why blockchain settlement?</p>
            <p>All payment routes are recorded on the blockchain for transparency, immutability, and auditability. Your selected network will be used for the final settlement.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
