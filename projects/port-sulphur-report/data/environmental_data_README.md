# Environmental Data Extraction Summary

**Generated**: 2026-01-22
**Source Document**: `enviromental_SYNTHESIS.md`
**Source File Count**: 158 files
**Output File**: `environmental_data.json`

## Overview

This JSON file contains structured environmental data extracted from the comprehensive environmental synthesis document for the former Freeport-McMoRan Port Sulphur facility. The data has been organized into machine-readable format suitable for mapping, visualization, and analysis.

## Data Structure

### Top-Level Sections

1. **metadata** - Document and facility identification
2. **regulatory_identifiers** - EPA, LDEQ, and permit IDs
3. **permit_status** - Current and historical permit information
4. **environmental_incidents** - Detailed incident records with measurements
5. **contamination_sites** - Site-specific contamination data
6. **groundwater_contamination** - Groundwater quality and migration data
7. **flood_zones** - Historical flooding and current risk assessment
8. **coastal_hazards** - Sea level rise and erosion data
9. **wetlands** - Wetland information (limited data available)
10. **remediation_status** - Cleanup projects and their status
11. **superfund_status** - EPA Superfund designation details
12. **key_findings** - Summary of major environmental issues
13. **environmental_liabilities** - Risks and obligations for future owners
14. **geojson_features** - Geographic features for mapping (5 features)
15. **data_sources** - List of source documents
16. **recommended_actions** - Due diligence steps
17. **notes** - Important caveats and limitations

## Key Numeric Data Extracted

### Coordinates
- **Facility Location**: 29.473414, -89.686632

### Contamination Measurements
- **Elemental Sulfur**: Up to 50,900 mg/kg (typical 40,000 mg/kg)
- **Soil pH**: 2.5-3.5 (highly acidic)
- **Groundwater pH**: Below 3.5 (acid mine drainage)
- **2009 Release**: 5.8 million pounds of acidic water
- **Minimum pH Recorded**: 1.7 SU (April 2009)

### Flood Data
- **Base Elevation**: 8 feet above sea level
- **Hurricane Katrina (2005)**: 22 feet of flooding
- **Hurricane Ida (2021)**: 9-14 feet storm surge (Plaquemines Parish)
- **Projected Subsidence by 2100**: 1-3 feet

### Temporal Data
- **Operations Period**: 1933-2005 (72 years)
- **Facility Closure**: Early 2000s
- **Katrina Destruction**: 2005-08-29
- **2009 Incident**: April 27 - June 15, 2009
- **Diesel Release Discovery**: 2016-07-18
- **Current Status**: No active permits as of 2025

## GeoJSON Features

The file includes 5 mappable features:

1. **facility_location** - Main facility site point
2. **2009_contamination_extent** - Acidic water release impact zone
3. **superfund_site** - EPA Non-NPL Superfund designation
4. **katrina_flood_zone** - Hurricane Katrina maximum flood extent
5. **river_mile_marker** - Mississippi River Mile 39 AHP location

Each feature includes:
- Coordinates (longitude, latitude)
- Descriptive properties
- Marker color and symbol suggestions for visualization

## Data Quality Notes

### High Confidence Data
- Regulatory identifiers (verified from EPA databases)
- Incident dates and timelines (from LDEQ closeout documents)
- pH measurements from 2009 incident
- Hurricane Katrina flood depth
- Facility address and coordinates

### Moderate Confidence Data
- Contamination concentration ranges (from similar sites)
- Projected subsidence estimates
- Site acreage measurements
- Historical operations dates

### Limited Data Available
- Specific wetland delineations
- Exact FEMA flood zone designation
- Detailed soil sampling results
- Current groundwater monitoring data

### Data Gaps
- No specific wetland boundary coordinates
- No detailed Phase II sampling results included in synthesis
- No current (2025-2026) monitoring well data
- Incomplete information on institutional controls

## Usage Recommendations

### For Mapping Applications
Use the `geojson_features` array to create map visualizations. Each feature has suggested marker colors and symbols for consistent presentation.

### For Risk Assessment
Focus on:
- `key_findings` for executive summary
- `environmental_liabilities` for financial planning
- `contamination_sites` for site-specific risks
- `flood_zones` for natural hazard assessment

### For Due Diligence
Refer to:
- `recommended_actions` for next steps
- `regulatory_identifiers` for database searches
- `data_sources` for document requests
- `environmental_incidents` for regulatory history

### For Remediation Planning
Review:
- `remediation_status` for completed work
- `contamination_sites` for remaining issues
- `superfund_status` for regulatory context
- `groundwater_contamination` for ongoing monitoring needs

## Integration with Other Components

This environmental data should be cross-referenced with:

- **Geographic Data**: For property boundary overlay
- **Infrastructure Data**: For location of remediation systems
- **Economic Data**: For cleanup cost estimation
- **Regulatory Data**: For permitting requirements

## Data Verification Required

Before using this data for decision-making, verify:

1. **Coordinates**: Field-verify GPS coordinates of key locations
2. **Flood Zones**: Obtain official FEMA Flood Insurance Rate Maps
3. **Contamination**: Conduct Phase I/II Environmental Site Assessments
4. **Permits**: Request official records from EPA and LDEQ
5. **Monitoring**: Obtain current groundwater monitoring reports
6. **Institutional Controls**: Review recorded land use restrictions

## Update History

- **2026-01-22**: Initial extraction from environmental synthesis document
  - 158 source files processed
  - 5 GeoJSON features created
  - 8 key findings identified
  - 2 major environmental incidents documented
  - 4 contamination sites characterized

## Contact for Data Questions

For questions about this data extraction or to report errors, refer to the original synthesis document or contact the environmental consultant who prepared the Phase I/II ESA reports referenced in the data sources.

## Citation

When using this data, cite as:

> Environmental Data Extraction from Port Sulphur Facility Synthesis Document. Extracted 2026-01-22 from enviromental_SYNTHESIS.md (158 source files). Former Freeport-McMoRan Port Sulphur Facility, 28310 Highway 23, Port Sulphur, Louisiana 70083.

## License and Disclaimer

This data is extracted from publicly available environmental records and regulatory documents. The data is provided for informational purposes only and should not be relied upon for transaction decisions without independent verification through appropriate environmental due diligence procedures including Phase I and Phase II Environmental Site Assessments conducted by qualified environmental professionals.

**CRITICAL DISCLAIMER**: This site carries exceptionally high environmental liability risks due to the combination of legacy contamination, extreme flood vulnerability, rapid coastal land loss, and EPA Superfund oversight. Any property transaction requires comprehensive environmental due diligence, substantial financial reserves for ongoing monitoring and maintenance obligations, and specialized environmental insurance coverage.
