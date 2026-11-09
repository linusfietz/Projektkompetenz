import React from "react";
import { staticFile } from "remotion";

export const REFERENCE_FILE = "HeinrichKG_Unternehmen.png";

/** A fixed cleanup plate assembled from reference pixels, never regenerated.
 * Only the parked truck and its contact shadow are masked. The building and
 * company sign remain the untouched source image. The reflected planting strip
 * is sampled immediately to the left of the truck, away from the building.
 */
export const ExteriorBackground: React.FC = () => (
  <g>
    <defs>
      <filter id="cleanup-feather" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <mask
        id="parked-truck-cleanup"
        maskUnits="userSpaceOnUse"
        x="1448"
        y="447"
        width="240"
        height="240"
      >
        <path
          d="M1462 472 L1582 455 L1685 461 L1685 687 H1490 L1462 660Z"
          fill="white"
          filter="url(#cleanup-feather)"
        />
      </mask>
      <mask
        id="contact-shadow-cleanup"
        maskUnits="userSpaceOnUse"
        x="1330"
        y="654"
        width="350"
        height="36"
      >
        <rect
          x="1340"
          y="659"
          width="350"
          height="25"
          fill="white"
          filter="url(#cleanup-feather)"
        />
      </mask>
      <clipPath id="clean-road">
        <rect x="1450" y="657" width="222" height="31" />
      </clipPath>
    </defs>
    <image
      href={staticFile(REFERENCE_FILE)}
      width="1672"
      height="941"
      preserveAspectRatio="none"
    />
    <g mask="url(#parked-truck-cleanup)">
      <image
        href={staticFile(REFERENCE_FILE)}
        width="1672"
        height="941"
        transform="translate(2920 0) scale(-1 1)"
      />
      <g clipPath="url(#clean-road)">
        <image
          href={staticFile(REFERENCE_FILE)}
          width="1672"
          height="941"
          transform="translate(0 -31)"
        />
      </g>
      {/* Continue the existing edge foliage behind the removed cab. */}
      <path
        d="M1675 456 Q1650 451 1655 474 Q1637 470 1639 493 Q1612 488 1618 514 Q1599 513 1606 536 Q1581 532 1585 557 Q1563 551 1565 578 Q1548 583 1555 611 L1552 650 H1680Z"
        fill="#7e9f26"
        stroke="#405b25"
        strokeWidth="2.5"
      />
      <path
        d="M1675 477 Q1659 477 1665 498 Q1640 500 1649 520 Q1627 519 1635 545 Q1611 536 1613 566 Q1591 558 1598 589 Q1574 588 1579 616 L1563 650 H1680Z"
        fill="#89a82d"
      />
      <path
        d="M1564 650 Q1558 626 1581 626 Q1589 604 1610 621 Q1625 602 1644 624 Q1665 599 1680 621 V650Z"
        fill="#5e842d"
      />
    </g>
    <g mask="url(#contact-shadow-cleanup)">
      <image
        href={staticFile(REFERENCE_FILE)}
        width="1672"
        height="941"
        transform="translate(0 -31)"
      />
    </g>
  </g>
);
