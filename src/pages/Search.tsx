import { Flex, HStack, Input, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React from "react";
import Info from "../components/Info";
import Loading from "../components/Loading";


const searchHeliotrope = async (query: string[], offset: Number = 0) => {
    const body = {
        "offset": offset,
        "query": query
    }
    
    const response = await fetch("https://cors-anywhere.herokuapp.com/https://heliotrope.me/v5/api/hitomi/search", {body: JSON.stringify(body), method: "POST"})
    const data = await response.json()
    return data.result
}

const FlexCenter = ({ content }: { content: String }) =>{
    return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh" flexGrow={1}>
        {content}
    </Flex>
    )
}

const Search = () => {
    const [init, setInit] = React.useState(false)
    const [tags, setTagged] = React.useState<string[]>([])
    const [showed, setShowed] = React.useState("")

    const [loading, setLoading] = React.useState(false)
    const [result, setResult] = React.useState([])

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        const value = event.target.value.toString()
        setShowed(value)
        if (value.endsWith(" ") && value.replace(/\s/g, '').length != 0) {
            setTagged([...tags, value.replace(" ", "")])
            setShowed("")
        }
        
    }

    const handleKey = async (event: { key: string }) => {
        if (event.key === "Backspace") {
            if (showed === ""){
                setShowed(tags[tags.length - 1])
                setTagged(tags.slice(0, tags.length - 1))
            }
            
        }
        if (event.key === "Enter"){
            setLoading(true)
            const fetchResult = await searchHeliotrope(tags)
            setResult(fetchResult)
            setLoading(false)
            if (!init){
                setInit(true)
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
                            tags.splice(tags.indexOf(value), 1)
                            setTagged([...tags]
                        )}
                    }/>
                </Tag>
                )}
        </HStack>
        <Input
          value={showed}
          onChange={handleChange}
          onKeyDown={handleKey}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        {
            loading ? <Loading/> : result?.length ? result.map(info => <Info {...info} />) : init ? <FlexCenter content="검색 결과를 찾을수없어요"/> : <FlexCenter content="검색해 주세요!"/>
        }
      </>
    )
  }

export default Search