import React from "react"
import SectionHeader from "./SectionHeader";
import './Section.scss';

type SectionHeaderList = {
  name: React.ReactNode,
  isActive?: boolean,
}

type SectionListProps = {
  headers: SectionHeaderList[];
} & React.HTMLAttributes<HTMLElement>

const SectionList = (props: SectionListProps) => {
  const { children, headers, ...restProps } = props;
  return (
    <div {...restProps}>
      <div className="section-header-list">
        {headers.map(header => (
          <SectionHeader isActive={!!header.isActive}>
            {header.name}
          </SectionHeader>
        ))
        }
      </div>
      <div className="section-content">
        {children}
      </div>
    </div>
  )
}

export default SectionList