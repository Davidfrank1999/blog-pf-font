//@TODO: remove this component 
import { Toolbar } from "radix-ui";
import {
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
} from "lucide-react";

import React from "react";

function ToolbarDemo({ editor }) {
  return (
    <Toolbar.Root
	className="fixed bottom-4 right-4 z-50 flex min-w-max bg-white p-2.5 shadow-md rounded-xl"
	aria-label="Formatting options"
	>

      {/* Text Formatting Group */}
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="bold"
          aria-label="Bold"
        >
          <Bold className="w-4 h-4" />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="italic"
          aria-label="Italic"
        >
          <Italic className="w-4 h-4" />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="strikethrough"
          aria-label="Strike through"
        >
          <Strikethrough className="w-4 h-4" />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>

      <Toolbar.Separator className="mx-2.5 w-px bg-mauve6" />

      {/* Alignment Group */}
      <Toolbar.ToggleGroup
        type="single"
        defaultValue="center"
        aria-label="Text alignment"
      >
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="left"
          aria-label="Left aligned"
        >
          <AlignLeft className="w-4 h-4" />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="center"
          aria-label="Center aligned"
        >
          <AlignCenter className="w-4 h-4" />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="right"
          aria-label="Right aligned"
        >
          <AlignRight className="w-4 h-4" />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>

      <Toolbar.Separator className="mx-2.5 w-px bg-mauve6" />

      {/* Link + Button */}
      <Toolbar.Link
        className="ml-0.5 hidden h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-transparent bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:cursor-pointer hover:bg-transparent hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 sm:inline-flex"
        href="#"
        target="_blank"
        style={{ marginRight: 10 }}
      >
        Edited 2 hours ago
      </Toolbar.Link>
      <Toolbar.Button
        className="inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-violet9 px-2.5 text-[13px] leading-none text-white outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
        style={{ marginLeft: "auto" }}
      >
        Share
      </Toolbar.Button>
    </Toolbar.Root>
  );
}

export default ToolbarDemo;
