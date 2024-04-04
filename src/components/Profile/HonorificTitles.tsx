
import {
  Chip,
  Textarea,
  Tooltip,
  } from "@nextui-org/react";
import React from "react";

import {HonorificTitle} from "../../lib/types/user.type"

const HonorificTitlesList = async ({ titles }: { titles: HonorificTitle[]}) => {
  if (titles.length===0) return
  return (
        <>
        <span className="uppercase text-sm text-gray-500 self-center mb-0">Títulos</span>
        <div>
          {titles.map((title, index) => {
            return (
              <Tooltip
                content={
                  <Textarea
                  isReadOnly
                  labelPlacement="outside"
                  defaultValue={title.description}
                  className="max-w-md"
                />
                }                
                key={index}
              >
                <Chip
                  size="sm"
                  variant="bordered"
                  className="mx-1 mb-1"
                >
                  {title.name}
                </Chip>
              </Tooltip>
            )
          })
          }
        </div>
        </> 
  );
};

export default HonorificTitlesList;
