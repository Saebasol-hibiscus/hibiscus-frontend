import React, { KeyboardEventHandler } from "react"
import { Input, Text, Tag, HStack, TagCloseButton, TagLabel } from "@chakra-ui/react"

const Searcher = () => {
    const [tags, setTagged] = React.useState<string[]>([])
    const [showed, setShowed] = React.useState("")

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        const value = event.target.value.toString()
        setShowed(value)
        if (value.endsWith(" ") && value.replace(/\s/g, '').length != 0) {
            setTagged([...tags, value.replace(" ", "")])
            setShowed("")
        }
        
    }

    const handleBackspace = (event: { key: string }) => {
        if (event.key === "Backspace") {
            if (showed === ""){
                setTagged(tags.slice(0, tags.length - 1))
                setShowed(tags[tags.length - 1])
            }
            
        }
    }

    return (
      <>
        <HStack spacing={4}>
            {tags.map(value => 
                <Tag>
                    <TagLabel>
                        {value}
                    </TagLabel>
                    <TagCloseButton 
                        onClick={() => {
                            tags.splice(
                                tags.indexOf(value), 1)
                                setTagged([...tags])
                        }
                    }/>
                </Tag>)
            }
        </HStack>
        <Input
          value={showed}
          onChange={handleChange}
          onKeyDown={handleBackspace}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
      </>
    )
  }


export default Searcher